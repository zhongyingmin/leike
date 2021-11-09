const fun = {
  install(app) {
    app.config.globalProperties.$sendIframe = (type, data) => {
      const iframe = document.getElementById("iframe_key");
      iframe.contentWindow.postMessage(
        {
          data: data,
          eve: type,
        },
        "*"
      );
    },
    app.config.globalProperties.$loadMap = (callback) => {
      window.addEventListener(
        "message",
        function(e) {
          let data = e.data;
          if (data.eve === "mapOk") {
            callback(data)
          }
        },
        true
      );
    };
  },
};

export default fun;
