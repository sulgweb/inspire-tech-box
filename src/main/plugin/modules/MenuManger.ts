import { BrowserWindow, Menu, MenuItem } from "electron";

export class MenuManger {
  public menuMap: Map<string, MenuItem>;
  constructor(props) {
    const { menuObj } = props;
    this.menuMap = new Map<string, MenuItem>();
    Object.keys(menuObj).map((item) => {
      this.menuMap.set(item, menuObj[item]);
    });
  }

  // 注册Menu
  public registerMenu(menuName: string, menuItem: MenuItem) {
    if (!this.menuMap.has(menuName)) {
      this.menuMap.set(menuName, menuItem);
    } else {
      throw Error(menuName + "已注册");
    }
    return this.menuMap.get(menuName);
  }

  // 注销Menu
  public unRegisterMenu(menuName: string) {
    if (this.menuMap.has(menuName)) {
      this.menuMap.delete(menuName);
    }
  }

  public getMenu(list: string[]) {
    const contextMenu = new Menu();
    list.map((item) => {
      if (this.menuMap.has(item)) {
        contextMenu.append(this.menuMap.get(item)!);
      } else {
        throw Error(item + "未注册");
      }
    });
    return contextMenu;
  }
}

const createTranslateHandler =
  (targetLang) => (menuItem, browserWindow, event) =>
    handleTranslate({ menuItem, browserWindow, event, targetLang });

const handleTranslate = (params) => {
  const { menuItem, browserWindow, event, targetLang } = params;
  browserWindow?.webContents?.send("ocr-translate", { targetLang });
};

const menuObj = {
  destory: new MenuItem({
    label: "销毁",
    click: (menuItem, browserWindow, event) => {
      browserWindow?.destroy();
    },
  }),
  ocr: new MenuItem({
    label: "OCR",
    click: (menuItem, browserWindow, event) => {
      browserWindow?.webContents?.send("ocr-base64");
    },
  }),
  reload: new MenuItem({
    label: "刷新",
    click: (menuItem, browserWindow, event) => {
      browserWindow?.reload();
    },
  }),
  devTools: new MenuItem({
    label: "开发者工具",
    click: (menuItem, browserWindow, event) => {
      browserWindow?.webContents?.openDevTools();
    },
  }),
  translate: new MenuItem({
    label: "翻译为",
    submenu: [
      {
        label: "中文",
        click: createTranslateHandler("ZH"),
      },
      {
        label: "English",
        click: createTranslateHandler("EN"),
      },
      {
        label: "Spanish",
        click: createTranslateHandler("ES"),
      },
      {
        label: "Français",
        click: createTranslateHandler("FR"),
      },
      {
        label: "日本語",
        click: createTranslateHandler("JA"),
      },
      {
        label: "Русский",
        click: createTranslateHandler("RU"),
      },
    ],
  }),
};

const DEFAULT_MENU_LIST = ["destory", "reload", "devTools"];

export const showCustomMenu = (
  win: BrowserWindow,
  menuList: string[] = DEFAULT_MENU_LIST
) => {
  win.webContents.on("context-menu", (e, params) => {
    const menu = menuManger.getMenu(menuList);
    menu.popup({ x: params.x, y: params.y });
  });
};

export const menuManger = new MenuManger({ menuObj });