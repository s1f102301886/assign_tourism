const lat = 35.642187; // ○○区の緯度
const lon = 39.713468; // ○○区の経度

const customIcons = {
    "01": "../assets/img/icons/clear.svg",
    "02": "../assets/img/icons/partly_cloudy.svg",
    "03": "../assets/img/icons/cloudy.svg",
    "04": "../assets/img/icons/cloudy.svg",
    "09": "../assets/img/icons/rain.svg",
    "10": "../assets/img/icons/rain.svg",
    "11": "../assets/img/icons/thunderstorm.svg",
    "13": "../assets/img/icons/snow.svg",
    "50": "../assets/img/icons/mist.svg"
};

async function fetchWeather() {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=ja`);
        if (!response.ok) {
            throw new Error("天気情報の取得に失敗しました。");
        }
        const data = await response.json();

        // HTMLに表示
        document.getElementById("temperature").textContent = `${data.main.temp}°C`;

        // 天気アイコンの表示
        const iconCode = data.weather[0].icon.substring(0, 2); // 最初の2文字を抽出
        const weatherIcon = document.getElementById("weather-icon");

        if (customIcons[iconCode]) {
            weatherIcon.src = customIcons[iconCode]; // カスタムアイコンを使用
        } else {
            weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`; // デフォルトアイコンを使用
        }

        weatherIcon.style.display = "block";

        // 取得時間を表示（秒数を省略）
        const time = new Date(data.dt * 1000);
        const options = {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit"
        };
        document.getElementById("time").textContent = `${time.toLocaleString("ja-JP", options)} 現在`;
    } catch (error) {
        console.error(error);
        document.getElementById("temperature").textContent = "気温: 取得失敗";
        document.getElementById("time").textContent = "取得時間: 取得失敗";
    }
}

fetchWeather();
