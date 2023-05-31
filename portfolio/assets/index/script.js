window.addEventListener("load", () => {
  const project = document.querySelector("#projects");
  const about = document.querySelector("#about");

  const renderContentPage = async (window_title) => {
    let _ele = document.createElement("div");
    _ele.classList.add("content-2");
    let _menu = document.createElement("div");
    _menu.classList.add("menu");
    let _menuTitle = document.createElement("div");
    _menuTitle.classList.add("menu-title");
    _menuTitle.innerHTML = window_title;
    let _menuButton = document.createElement("input");
    _menuButton.type = "button";
    _menuButton.value = "X";
    _menuButton.onclick = () => {
      project.disabled = false;
      about.disabled = false;
      document.querySelector(".content-2").remove();
    };
    _menu.appendChild(_menuTitle);
    _menu.appendChild(_menuButton);
    _ele.appendChild(_menu);
    let _content = document.createElement("div");
    _content.classList.add("content-wrapper");
    _ele.appendChild(_content);
    document.querySelector(".content").appendChild(_ele);
    if (window_title === "Projects") {
      await renderContentItems();
    } else {
      await renderAboutPage();
    }
  };
  const renderContentItems = async () => {
    await fetch("./assets/projects/list.json")
      .then((res) => {
        return res.json();
      })
      .then((items) => {
        items.forEach((e) => {
          let _ele = document.createElement("div");
          _ele.classList.add("content-data");
          let _h3 = document.createElement("h3");
          _h3.innerHTML = e.title;
          let _p = document.createElement("p");
          _p.innerHTML = e.desc;
          let _previews = document.createElement("div");
          _previews.classList.add("previews");

          e.images.forEach((img_src) => {
            let _img = document.createElement("img");
            _img.src = img_src;
            _img.alt = "e.title";
            _img.draggable = "false";
            _img.oncontextmenu = "return false";
            _previews.appendChild(_img);
          });
          let _tools = document.createElement("div");
          _tools.classList.add("tools");
          let _toolsText = document.createElement("span");
          _toolsText.innerHTML = "Tools used: ";
          _tools.appendChild(_toolsText);
          e.tools.forEach((tool) => {
            let _tool = document.createElement("img");
            _tool.src = `./assets/icons/${tool}.svg`;
            _tool.alt = tool;
            _tool.addEventListener("contextmenu", (e) => {
              e.preventDefault();
            });
            _tools.appendChild(_tool);
          });
          let _links = document.createElement("div");
          _links.classList.add("links");
          let _linkBtn1 = document.createElement("input");
          _linkBtn1.type = "button";
          _linkBtn1.value = e.links.live ? "Live" : "APK";
          _linkBtn1.onclick = () => {
            window.open(e.links.live || e.links.apk, "_blank");
          };
          let _linkBtn2 = document.createElement("input");
          _linkBtn2.type = "button";
          _linkBtn2.value = "Code";
          _linkBtn2.onclick = () => {
            window.open(e.links.code, "_blank");
          };
          _links.appendChild(_linkBtn1);
          _links.appendChild(_linkBtn2);

          _ele.appendChild(_h3);
          _ele.appendChild(_p);
          _ele.appendChild(_previews);
          _ele.appendChild(_tools);
          _ele.appendChild(_links);

          document.querySelector(".content-wrapper").appendChild(_ele);
        });
        window.scrollTo(0, document.body.scrollHeight, "smooth");
      });
  };
  const renderAboutPage = async () => {
    let _ele = document.createElement("div");
    let _img = document.createElement("img");
    _img.src = "./assets/index/profile.png";
    _img.alt = "About";
    _img.draggable = "false";
    _img.oncontextmenu = "return false";
    _img.style.width = "200px";
    _img.style.height = "200px";
    _img.style.padding = "10px";
    _img.style.margin = "20px";
    _img.style.alignSelf = "center";
    _img.style.borderRadius = "50%";
    _img.style.boxShadow = "0px 0px 10px 0px rgba(0,0,0,0.15)";

    // _img.style.backgroundColor = "white";
    _ele.appendChild(_img);
    _ele.style.display = "flex";
    _ele.style.flexDirection = "column";
    _ele.style.alignItems = "center";
    _ele.style.justifyContent = "center";

    _ele.classList.add("about");
    let _h3 = document.createElement("h3");
    _h3.innerHTML = "About Me";
    let _p = document.createElement("p");
    let _a = document.createElement("a");
    _a.href = "./assets/resume/rahul-reddy-resume.pdf";
    _a.target = "_blank";
    _a.innerHTML = "Download Resume";

    _p.innerHTML =
      "Hi I am student. I love to code, make websites, apps using react and Iam little bit into django where I can make backend for my web apps and I am learning it.";

    _ele.appendChild(_h3);
    _ele.appendChild(_p);
    _ele.appendChild(_a);
    let _blank = document.createElement("div");
    _blank.classList.add("blank");
    document.querySelector(".content-wrapper").appendChild(_ele);
    document.querySelector(".content-wrapper").appendChild(_blank);

    window.scrollTo(0, document.body.scrollHeight, "smooth");
  };

  project.addEventListener("click", async () => {
    if (about.disabled === false) renderContentPage("Projects");
    else {
      document.querySelector(".content-2").remove();
      about.disabled = false;
      renderContentPage("Projects");
    }
    project.disabled = true;
  });

  about.addEventListener("click", async () => {
    if (project.disabled === false) renderContentPage("About");
    else {
      document.querySelector(".content-2").remove();
      project.disabled = false;
      renderContentPage("About");
    }
    about.disabled = true;
  });
});
