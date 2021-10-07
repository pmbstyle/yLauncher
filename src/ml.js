import Vue from 'vue'
import { MLInstaller, MLCreate, MLanguage } from 'vue-multilanguage'

Vue.use(MLInstaller)

export default new MLCreate({
	initial: 'en',
	save: process.env.NODE_ENV === 'production',
	languages: [
		new MLanguage('ru').create({
		microsoftLogin: "Логин Microsoft",
            loginDescription: "Если вы еще не мигрировали ваш Mojang аккаунт в Microsoft, то вы можете сделать это в вашем профайле на сайте minecraft.net",
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
            categories: "Категории",
            readMore:"Подробнее"
		}),
		new MLanguage('en').create({
            microsoftLogin: "Microsoft Sign In",
            loginDescription: "If you are didn't migrate your Mojang account to Microsoft yet, you can do it in your profile section on minecraft.net web site.",
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
            categories: "Wiki Categories",
            readMore: "Read More"
		})
	]
})