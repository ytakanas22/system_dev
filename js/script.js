class App {
    constructor(strings) {
        this.strings = strings;
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.setStrings(this.strings);
            this.cacheElements();
            this.animateInitialState();
            this.addEventListeners();
            this.exporter();
        });
    }

    setStrings(data) {
        for (const key in data) {
            const element = document.getElementById(key);
            if (element) {
                element.textContent = data[key];
            }
        }
    }

    cacheElements() {
        this.heading = document.querySelector("#heading");
        this.description = document.querySelector("#description");
        this.button = document.querySelector("#button");
        this.inputFields = document.querySelector("#inputFields");
        this.backButton = document.querySelector("#backButton");
        this.saveButton = document.querySelector("#saveButton");
        this.exportButton = document.querySelector("#exportButton");
    }

    animateInitialState() {
        const headingKeyframes = {
            color: ["transparent", "#fff"],
            backgroundPosition: ["100% 0", "0 0"],
        };
        const descriptionKeyframes = {
            opacity: [0, 1],
            transform: ["translateY(20px)", "translateY(0)"],
        };
        const buttonKeyframes = {
            opacity: [0, 1],
            transform: ["scale(0.8)", "scale(1)"],
        };

        const headingOptions = {
            duration: 2000,
            easing: "ease"
        };
        const descriptionOptions = {
            delay: 1000,
            duration: 1500,
            easing: "ease",
            fill: "forwards"
        };
        const buttonOptions = {
            delay: 1000,
            duration: 1500,
            easing: "ease",
            fill: "forwards"
        };

        this.heading.animate(headingKeyframes, headingOptions);
        this.description.animate(descriptionKeyframes, descriptionOptions);
        this.button.animate(buttonKeyframes, buttonOptions);
    }

    animateInputFields() {
        this.heading.animate({ opacity: [1, 0] }, { duration: 500, fill: "forwards" });
        this.description.animate({ opacity: [1, 0] }, { duration: 500, fill: "forwards" });
        this.button.animate({ opacity: [1, 0] }, { duration: 500, fill: "forwards" }).onfinish = () => {
            this.heading.style.display = "none";
            this.description.style.display = "none";
            this.button.style.display = "none";
        }
    }

    addEventListeners() {
        this.button.addEventListener("click", () => {
            this.animateInputFields();
            this.inputFields.animate({ opacity: [0, 1] }, { duration: 500, fill: "forwards" }).onfinish = () => {
                this.inputFields.style.display = "block";
            }
        });

        this.backButton.addEventListener("click", () => {
            this.inputFields.animate({ opacity: [1, 0] }, { duration: 500, fill: "forwards" }).onfinish = () => {
                this.inputFields.style.display = "none";
            }
            this.heading.animate({ opacity: [0, 1] }, { duration: 500, fill: "forwards" });
            this.description.animate({ opacity: [0, 1] }, { duration: 500, fill: "forwards" });
            this.button.animate({ opacity: [0, 1] }, { duration: 500, fill: "forwards" }).onfinish = () => {
                this.heading.style.display = "block";
                this.description.style.display = "block";
                this.button.style.display = "block";
            }
        });
    

        this.saveButton.addEventListener("click", () => {
            const projectName = document.getElementById("projectName").value;
            const functionalReq = document.getElementById("functionalReq").value;
            const nonFunctionalReq = document.getElementById("nonFunctionalReq").value;
            const externalDesign = document.getElementById("externalDesign").value;
            const internalDesign = document.getElementById("internalDesign").value;

            const data = {
                projectName: projectName,
                functionalReq: functionalReq,
                nonFunctionalReq: nonFunctionalReq,
                externalDesign: externalDesign,
                internalDesign: internalDesign,
            };

            localStorage.setItem("projectData", JSON.stringify(data));
            alert("データを保存しました。");
        });

        this.exportButton.addEventListener("click", () => {
            const element = document.querySelector(".container");
        
            html2pdf()
                .set({
                    margin: 10, // 余白調整
                    filename: "project_data.pdf",
                    image: { type: "jpeg", quality: 0.98 },
                    html2canvas: { 
                        scale: 3,  // 高解像度で出力
                        scrollY: 0 // スクロール位置によるズレを防ぐ
                    },
                    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
                })
                .from(element)
                .save();
        });
    }

}

const strings = {
    heading: "システム開発サポーター",
    description: "システム開発のサポートをするアプリです。",
    button: "開始する",
    backButton: "戻る",
    saveButton: "保存する",
    exportButton: "PDF保存",
};

new App(strings);