import Vue from 'vue'
import { MLInstaller, MLCreate, MLanguage } from 'vue-multilanguage'

Vue.use(MLInstaller)

export default new MLCreate({
	initial: 'en',
	save: process.env.NODE_ENV === 'production',
	languages: [
		new MLanguage('ru').create({
			discordLogin: "Логин через Discord",
            loginDescription: "Либо при помощи аккаунта Mojang",
            loginDescriptionError: "Указаны неверные данные",
            saveLogin: "Сохранить email",
            loginBtn: "Войти",
            playBtn: "Играть"
		}),
		new MLanguage('en').create({
			discordLogin: "Login with Discord",
            loginDescription: "Or use your Mojang account",
            loginDescriptionError: "Access denied, invalid credentials",
            saveLogin: "Save email for next login",
            loginBtn: "Login",
            playBtn: "Play"
		})
	]
})