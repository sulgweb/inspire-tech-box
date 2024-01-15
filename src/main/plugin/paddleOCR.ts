import OCR from "paddleocrjson";
import path from "path";
import { ipcMain, ipcRenderer } from "electron";

class PaddleOCRServer {
  private static instance: PaddleOCRServer;
  public ocr: OCR;

  private constructor() {
    this.ocr = new OCR(
      "PaddleOCR-json.exe",
      [
        /* '-port=9985', '-addr=loopback' */
      ],
      {
        cwd: `${path.join(__dirname, "..", "PaddleOCR")}`,
      },
      false
    );
  }

  public static getInstance(): PaddleOCRServer {
    if (!PaddleOCRServer.instance) {
      PaddleOCRServer.instance = new PaddleOCRServer();
    }
    return PaddleOCRServer.instance;
  }

  public recognize(image_base64: string) {
    return this.ocr.flush({ image_base64 });
  }
}
ipcMain.on("screenshot-recognize", (e, data) => {
  paddleOCRServer.recognize(filterBase64Prefix(data.base64)).then((res) => {
    console.log(res);
    e.reply("screenshot-recognize-result", res);
    // ipcMain.emit("screenshot-recognize-result", res);
  });
});

function filterBase64Prefix(str: string): string {
  const regex = /^data:image\/[a-z]+;base64,/;
  return str.replace(regex, "");
}
export const paddleOCRServer = PaddleOCRServer.getInstance();
