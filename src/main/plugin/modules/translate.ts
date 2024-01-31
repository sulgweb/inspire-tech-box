import axios from "axios";
import { ipcMain } from "electron";
import { paddleOCRServer, filterBase64Prefix } from "./paddleOCR";
import { translate } from "deeplx";

// interface ITranslateParams {
//   text: string;
//   source_lang?: string;
//   target_lang: string;
// }

// export async function translate(params: ITranslateParams) {
//   const url = " https://deeplx.vercel.app/translate";

//   const response = await axios.post(url, {
//     ...params,
//     source_lang: params.source_lang || "auto",
//   });

//   console.log(response.data);
// }

ipcMain.handle("translate", async (e, data) => {
  return await translate(data.text, data.targetLang, "auto");
});

ipcMain.handle("ocr-translate-reply", async (e, data) => {
  const ocr = await paddleOCRServer.recognize(filterBase64Prefix(data.base64));
  const ocrText = ocr.data?.map((item) => item.text).join("");
  const translateText = await translate(ocrText || "", data.targetLang);
  // console.log(data.targetLang, translateText);
  // translateText.split(";;;;").map((item, index) => {
  //   (ocr.data as any)[index]["text"] = item;
  // });
  return translateText;
});
