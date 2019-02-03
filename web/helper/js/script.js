const CONDITIONS =
    {
        "selectBuild": ["helper/data/valueBuild.txt", "textAreaBuild", "btnHideBuild", "btnShowBuild"],
        "selectBifit": ["helper/data/valueBifit.txt", "textAreaBifit", "btnHideBifit", "btnShowBifit"],
        "selectInet": ["helper/data/valueInet.txt", "textAreaInet", "btnHideInet", "btnShowInet"],
        "selectOther": ["helper/data/valueOther.txt", "textAreaOther", "btnHideOther", "btnShowOther"]
    };

/**
 * метод открывающий спойлер
 * @param n - id div'а который надо открыть
 */
function viewSpoiler(n) {
    const style = document.getElementById(n).style;
    style.display = (style.display === 'none') ? 'block' : 'none';
}

/**
 * тестовый метод для проверки работы отправки запросов из javascript
 */
function hello() {
    const request = new XMLHttpRequest();
    request.open("GET", "helper/data/hello.txt", false);
    request.send();
    const status = request.status;
    if(status === 200)
        document.write("<p>Текст ответа: " + request.responseText + "</p>");
    else if(status === 404)
        document.write("Ресурс не найден");
    else
        document.write(request.statusText);
}

/**
 * Метод для загрузки из файла txt options
 * @param id - id тега <select>
 */
function loadOption(id) {
    const arr = CONDITIONS[id];
    const request = new XMLHttpRequest();
    request.open("GET", arr[0], false);
    request.send();
    const status = request.status;
    if (status === 200) {
        let text = request.responseText;
        let json = JSON.parse(text);
        let i = 0;
        for (let key in json) {
            document.getElementById(id).options[i] = new Option(key, key);
            i++;
        }
    }
    else {
        alert("Пошло что то не так с загрузкой keyOptions")
    }
}

/**
 * Метод загружает и показывает TextArea
 * @param id - id тега <select>
 */
function showTextArea(id) {
    const arr = CONDITIONS[id];
    refreshTextArea(id);
    changeDisplayElement(arr);
}

/**
 * Метод реализующий смену видимости по нажатию на кнопку Скрыть
 * @param id - id тега <select>
 */
function hideTextArea(id) {
    const arr = CONDITIONS[id];
    changeDisplayElement(arr);
}

/**
 * смена атрибута style.display у элементов на противоположный
 * @param arr - массив переданных эементов
 */
function changeDisplayElement(arr)  {
    for (var i = 1; i < arr.length; i++) {
        let elem = document.getElementById(arr[i]);
        if (elem.style.display === "none"){
            elem.style.display = "block";
        } else if(elem.style.display === "block") {
            elem.style.display = "none";
        }
    }
}

/**
 * Метод загрузки данных из файла и отображения их в TextArea
 * @param id - id тега <select>
 */
function refreshTextArea(id) {
    const arr = CONDITIONS[id];
    const request = new XMLHttpRequest();
    request.open("GET", arr[0], false);
    request.send();
    const status = request.status;
    if (status === 200) {
        //получение значения атрубута value выделенного Options
        let selectedIndex = document.getElementById(id).options.selectedIndex; // индекс выделенного Option
        let selectOption = document.getElementById(id).options[selectedIndex]; // выделенный Options
        let atrSelectOption = selectOption.innerHTML;
        // получение JSON объекта
        let text = request.responseText;
        let json = JSON.parse(text);
        console.log(json);
        for (key in json) {
            if (key === atrSelectOption) {
                document.getElementById(arr[1]).innerHTML = json[key];
            }
        }
    }
    else {
        alert("Пошло что то не так с загрузкой valueListBuild")
    }
}

//Реализовать кнопку Добавить.
//Реализовать Post метод сервлета, вызываемый по нажатию кнопки Добавить
//Реализовать кнопку Удалить.
//ревью html файла
//В ссылках Инете в поле TextArea сделать ссылки кликабельными.
//Навесить стили.
