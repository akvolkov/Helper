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
 * метод показывающий textArea выбранного option
 * @param n - id select'а
 */
function viewValue(n) {
    const options = document.getElementById(n).getElementsByTagName("option");
    let selectOption; //номер выделенного option
    for (let i =0; i < options.length; i++) {
        if (options[i].selected === true) {
            selectOption = i;
            break;
        }
    }
    //сделать загрузку сохраненных данных из файла
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
        //надо пройтись циклом по json объекту и вытащить value, соответствующий ключу atrSelectOption
        // https://itchief.ru/lessons/javascript/javascript-json
        for (key in json) {
            if (key === atrSelectOption) {
                document.getElementById(arr[1]).innerHTML = json[key];
                document.getElementById(arr[1]).style.display = "block";
                document.getElementById(arr[2]).style.display = "block";
                document.getElementById(arr[3]).style.display = "none";
                // classList.add("hideElement");
            }
        }
    }
    else {
        alert("Пошло что то не так с загрузкой valueListBuild")
    }
}

/**
 * Метод реализующий смену видимости по нажатию на кнопку Скрыть
 * @param id - id тега <select>
 */
function hideTextArea(id) {
    const arr = CONDITIONS[id];
    document.getElementById(arr[1]).style.display = "none";
    document.getElementById(arr[2]).style.display = "none";
    document.getElementById(arr[3]).style.display = "block";
}

function getParams(name)  {

}

//Реализовать смену значения textArea при выборе options, сейчас меняется только при нажатии кнопки показать
//Реализовать кнопку Добавить.