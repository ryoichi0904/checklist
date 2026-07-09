// チェックボックス取得
const checkboxes = document.querySelectorAll("input[type='checkbox']");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const resetBtn = document.getElementById("resetBtn");

// チェック状態を保存
function saveData() {
    const data = [];

    checkboxes.forEach((checkbox) => {
        data.push(checkbox.checked);
    });

    localStorage.setItem("checklist", JSON.stringify(data));
}

// チェック状態を読み込む
function loadData() {

    const data = JSON.parse(localStorage.getItem("checklist"));

    if (!data) return;

    checkboxes.forEach((checkbox, index) => {

        checkbox.checked = data[index];

    });

}

// 進捗バー更新
function updateProgress() {

    let checked = 0;

    checkboxes.forEach((checkbox) => {

        if (checkbox.checked) {

            checked++;

        }

    });

    const total = checkboxes.length;

    const percent = Math.round((checked / total) * 100);

    progressBar.max = 100;
    progressBar.value = percent;

    progressText.textContent =
        `${checked} / ${total}　(${percent}%)`;

}

// チェックされたら
checkboxes.forEach((checkbox) => {

    checkbox.addEventListener("change", () => {

        saveData();

        updateProgress();

    });

});

// リセット
resetBtn.addEventListener("click", () => {

    if (!confirm("すべてのチェックを外しますか？")) return;

    checkboxes.forEach((checkbox) => {

        checkbox.checked = false;

    });

    saveData();

    updateProgress();

});

// 起動時
loadData();

updateProgress();