import Vue from 'vue'
import { MLInstaller, MLCreate, MLanguage } from 'vue-multilanguage'

Vue.use(MLInstaller)

export default new MLCreate({
	initial: 'en',
	save: process.env.NODE_ENV === 'production',
	languages: [
		new MLanguage('ru').create({
			microsoftLogin: "Логин через Microsoft",
            loginDescription: "Либо при помощи аккаунта Mojang",
            loginDescriptionError: "Указаны неверные данные",
            saveLogin: "Сохранить email",
            loginBtn: "Войти",
            playBtn: "Играть",
            playingBtn: "Играем",
            launchingBtn: "Запускаем",
            level: "Уровень",
            premium: "Подписка",
            minRam: "Мин. памяти",
            maxRam: "Макс. памяти",
            debugSetting: "Лог лаунчера",
            language: "Язык",
            russian: "Русский",
            english: "Английский",
            on: "Включено",
            off: "Выключено",
            save: "Сохранить",
            categories: "Категории"
		}),
		new MLanguage('en').create({
            microsoftLogin: "Sign In with Microsoft",
            loginDescription: "Or use your Mojang account",
            loginDescriptionError: "Access denied, invalid credentials",
            saveLogin: "Save email for next login",
            loginBtn: "Login",
            playBtn: "Play",
            playingBtn: "Playing",
            launchingBtn: "Launching",
            level: "Level",
            premium: "Premium",
            minRam: "Min RAM",
            maxRam: "Max RAM",
            debugSetting: "Debuger",
            language: "Language",
            russian: "Russian",
            english: "English",
            on: "On",
            off: "Off",
            save: "Save",
            categories: "Wiki Categories"
		})
	]
})