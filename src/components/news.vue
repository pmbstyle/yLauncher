<template>
	<div id="news">
		<vue-custom-scrollbar :settings="scrollSettings" class="wrapper">
			<div>
				<div class="news" v-for="item in news" :key="item.id">
					<div class="image">
						<div class="wrapper">
							<img :src="item.image" alt="">
						</div>
						<p class="date">{{item.date}}</p>
					</div>
					<div class="content">
						<a href="#" @click="showFull(item.id)">
							<h2>{{preferences.lang == 'en' ? item.title_en : item.title_ru}}</h2>
						</a>
						<p class="desc">{{preferences.lang == 'en' ? item.description_en : item.description_ru}}</p>
						<a href="#" @click="showFull(item.id)">
							{{$ml.get('readMore')}}
						</a>
					</div>
				</div>
			</div>
		</vue-custom-scrollbar>
		<div class="fulltext" v-if="newsShown">
			<div class="window-content">
				<div class="close" @click="hideFull()">
					<div class="close-wrap">
						<div class="close-ico"></div>
					</div>
				</div>
				<vue-custom-scrollbar :settings="scrollSettings">
					<div class="body" v-html="fullContent">
						{{fullContent}}
					</div>
				</vue-custom-scrollbar>
			</div>
		</div>
	</div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
import vueCustomScrollbar from 'vue-custom-scrollbar'
import "vue-custom-scrollbar/dist/vueScrollbar.css"
export default {
	name:'news',
	components: {
		vueCustomScrollbar
	},
	data: function() {
		return {
			news: [
				{
					id:0,
					image:'https://ufacitynews.ru/media/ft/cd/78/cd7898d0-79d5-4d33-b113-345bcbc412be/minecraft-dungeons_011018.jpg__900x540_q85_subsampling-2.jpg',
					title_en:'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
					title_ru:'Таким образом новая модель организационной деятельности.',
					description_en:'Nunc feugiat erat rutrum odio dignissim porttitor. Integer sagittis commodo convallis. Donec vitae felis quis est hendrerit malesuada. Maecenas in metus vel nulla placerat iaculis. Aliquam erat volutpat. Vestibulum sit amet laoreet odio, quis ullamcorper tellus. Fusce elementum commodo massa et cursus. Pellentesque feugiat justo ac ipsum bibendum, eu viverra quam maximus. Donec consequat vestibulum nulla a mattis.',
					description_ru:' Таким образом сложившаяся структура организации требуют от нас анализа новых предложений. Не следует, однако забывать, что постоянный количественный рост и сфера нашей активности обеспечивает широкому кругу (специалистов) участие в формировании позиций, занимаемых участниками в отношении поставленных задач. Равным образом новая модель организационной деятельности влечет за собой процесс внедрения и модернизации новых предложений.',
					date:'28.01.2021',
					full_text_en:`
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc feugiat erat rutrum odio dignissim porttitor. Integer sagittis commodo convallis. Donec vitae felis quis est hendrerit malesuada. Maecenas in metus vel nulla placerat iaculis. Aliquam erat volutpat. Vestibulum sit amet laoreet odio, quis ullamcorper tellus. Fusce elementum commodo massa et cursus. Pellentesque feugiat justo ac ipsum bibendum, eu viverra quam maximus. Donec consequat vestibulum nulla a mattis.</p>
					<p>Curabitur vehicula enim quis consequat ultrices. Aliquam non turpis egestas, malesuada ipsum quis, volutpat ligula. Etiam tincidunt est vel euismod cursus. Aliquam quis consectetur eros. Suspendisse non odio nunc. Suspendisse potenti. Aliquam augue neque, pellentesque quis sagittis id, vestibulum commodo erat. Fusce condimentum nisl ut sem laoreet convallis. In accumsan, ipsum posuere cursus gravida, sapien urna pretium lorem, eu elementum ligula lorem at mi. Etiam quis malesuada justo.</p>`,
					full_text_ru:`
					<p>Таким образом новая модель организационной деятельности играет важную роль в формировании позиций, занимаемых участниками в отношении поставленных задач. Равным образом новая модель организационной деятельности влечет за собой процесс внедрения и модернизации новых предложений. Таким образом сложившаяся структура организации требуют от нас анализа новых предложений. Не следует, однако забывать, что постоянный количественный рост и сфера нашей активности обеспечивает широкому кругу (специалистов) участие.</p>
					<p>Идейные соображения высшего порядка, а также консультация с широким активом представляет собой интересный эксперимент проверки модели развития. Таким образом дальнейшее развитие различных форм деятельности влечет за собой процесс внедрения и модернизации систем массового участия.</p>`,
				},
				{
					id:1,
					image:'https://ufacitynews.ru/media/ft/cd/78/cd7898d0-79d5-4d33-b113-345bcbc412be/minecraft-dungeons_011018.jpg__900x540_q85_subsampling-2.jpg',
					title_en:'Etiam ultricies eleifend diam, eget malesuada.',
					title_ru:'С другой стороны сложившаяся структура организации влечет за собой процесс.',
					description_en:'Nunc feugiat erat rutrum odio dignissim porttitor. Integer sagittis commodo convallis. Donec vitae felis quis est hendrerit malesuada. Maecenas in metus vel nulla placerat iaculis. Aliquam erat volutpat. Vestibulum sit amet laoreet odio, quis ullamcorper tellus. Fusce elementum commodo massa et cursus. Pellentesque feugiat justo ac ipsum bibendum, eu viverra quam maximus. Donec consequat vestibulum nulla a mattis.',
					description_ru:' Таким образом сложившаяся структура организации требуют от нас анализа новых предложений. Не следует, однако забывать, что постоянный количественный рост и сфера нашей активности обеспечивает широкому кругу (специалистов) участие в формировании позиций, занимаемых участниками в отношении поставленных задач. Равным образом новая модель организационной деятельности влечет за собой процесс внедрения и модернизации новых предложений.',
					date:'27.01.2021',
					full_text_en:`
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc feugiat erat rutrum odio dignissim porttitor. Integer sagittis commodo convallis. Donec vitae felis quis est hendrerit malesuada. Maecenas in metus vel nulla placerat iaculis. Aliquam erat volutpat. Vestibulum sit amet laoreet odio, quis ullamcorper tellus. Fusce elementum commodo massa et cursus. Pellentesque feugiat justo ac ipsum bibendum, eu viverra quam maximus. Donec consequat vestibulum nulla a mattis.</p>
					<p>Curabitur vehicula enim quis consequat ultrices. Aliquam non turpis egestas, malesuada ipsum quis, volutpat ligula. Etiam tincidunt est vel euismod cursus. Aliquam quis consectetur eros. Suspendisse non odio nunc. Suspendisse potenti. Aliquam augue neque, pellentesque quis sagittis id, vestibulum commodo erat. Fusce condimentum nisl ut sem laoreet convallis. In accumsan, ipsum posuere cursus gravida, sapien urna pretium lorem, eu elementum ligula lorem at mi. Etiam quis malesuada justo.</p>`,
					full_text_ru:`
					<p>Таким образом новая модель организационной деятельности играет важную роль в формировании позиций, занимаемых участниками в отношении поставленных задач. Равным образом новая модель организационной деятельности влечет за собой процесс внедрения и модернизации новых предложений. Таким образом сложившаяся структура организации требуют от нас анализа новых предложений. Не следует, однако забывать, что постоянный количественный рост и сфера нашей активности обеспечивает широкому кругу (специалистов) участие.</p>
					<p>Идейные соображения высшего порядка, а также консультация с широким активом представляет собой интересный эксперимент проверки модели развития. Таким образом дальнейшее развитие различных форм деятельности влечет за собой процесс внедрения и модернизации систем массового участия.</p>`,
				},
				{
					id:2,
					image:'https://ufacitynews.ru/media/ft/cd/78/cd7898d0-79d5-4d33-b113-345bcbc412be/minecraft-dungeons_011018.jpg__900x540_q85_subsampling-2.jpg',
					title_en:'Aliquam quis consectetur eros.',
					title_ru:'Идейные соображения высшего порядка, а также консультация с широким.',
					description_en:'Nunc feugiat erat rutrum odio dignissim porttitor. Integer sagittis commodo convallis. Donec vitae felis quis est hendrerit malesuada. Maecenas in metus vel nulla placerat iaculis. Aliquam erat volutpat. Vestibulum sit amet laoreet odio, quis ullamcorper tellus. Fusce elementum commodo massa et cursus. Pellentesque feugiat justo ac ipsum bibendum, eu viverra quam maximus. Donec consequat vestibulum nulla a mattis.',
					description_ru:' Таким образом сложившаяся структура организации требуют от нас анализа новых предложений. Не следует, однако забывать, что постоянный количественный рост и сфера нашей активности обеспечивает широкому кругу (специалистов) участие в формировании позиций, занимаемых участниками в отношении поставленных задач. Равным образом новая модель организационной деятельности влечет за собой процесс внедрения и модернизации новых предложений.',
					date:'26.01.2021',
					full_text_en:`
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc feugiat erat rutrum odio dignissim porttitor. Integer sagittis commodo convallis. Donec vitae felis quis est hendrerit malesuada. Maecenas in metus vel nulla placerat iaculis. Aliquam erat volutpat. Vestibulum sit amet laoreet odio, quis ullamcorper tellus. Fusce elementum commodo massa et cursus. Pellentesque feugiat justo ac ipsum bibendum, eu viverra quam maximus. Donec consequat vestibulum nulla a mattis.</p>
					<p>Curabitur vehicula enim quis consequat ultrices. Aliquam non turpis egestas, malesuada ipsum quis, volutpat ligula. Etiam tincidunt est vel euismod cursus. Aliquam quis consectetur eros. Suspendisse non odio nunc. Suspendisse potenti. Aliquam augue neque, pellentesque quis sagittis id, vestibulum commodo erat. Fusce condimentum nisl ut sem laoreet convallis. In accumsan, ipsum posuere cursus gravida, sapien urna pretium lorem, eu elementum ligula lorem at mi. Etiam quis malesuada justo.</p>`,
					full_text_ru:`
					<p>Таким образом новая модель организационной деятельности играет важную роль в формировании позиций, занимаемых участниками в отношении поставленных задач. Равным образом новая модель организационной деятельности влечет за собой процесс внедрения и модернизации новых предложений. Таким образом сложившаяся структура организации требуют от нас анализа новых предложений. Не следует, однако забывать, что постоянный количественный рост и сфера нашей активности обеспечивает широкому кругу (специалистов) участие.</p>
					<p>Идейные соображения высшего порядка, а также консультация с широким активом представляет собой интересный эксперимент проверки модели развития. Таким образом дальнейшее развитие различных форм деятельности влечет за собой процесс внедрения и модернизации систем массового участия.</p>`,
				},
				{
					id:3,
					image:'https://ufacitynews.ru/media/ft/cd/78/cd7898d0-79d5-4d33-b113-345bcbc412be/minecraft-dungeons_011018.jpg__900x540_q85_subsampling-2.jpg',
					title_en:'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
					title_ru:'Таким образом новая модель организационной деятельности.',
					description_en:'Nunc feugiat erat rutrum odio dignissim porttitor. Integer sagittis commodo convallis. Donec vitae felis quis est hendrerit malesuada. Maecenas in metus vel nulla placerat iaculis. Aliquam erat volutpat. Vestibulum sit amet laoreet odio, quis ullamcorper tellus. Fusce elementum commodo massa et cursus. Pellentesque feugiat justo ac ipsum bibendum, eu viverra quam maximus. Donec consequat vestibulum nulla a mattis.',
					description_ru:' Таким образом сложившаяся структура организации требуют от нас анализа новых предложений. Не следует, однако забывать, что постоянный количественный рост и сфера нашей активности обеспечивает широкому кругу (специалистов) участие в формировании позиций, занимаемых участниками в отношении поставленных задач. Равным образом новая модель организационной деятельности влечет за собой процесс внедрения и модернизации новых предложений.',
					date:'28.01.2021',
					full_text_en:`
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc feugiat erat rutrum odio dignissim porttitor. Integer sagittis commodo convallis. Donec vitae felis quis est hendrerit malesuada. Maecenas in metus vel nulla placerat iaculis. Aliquam erat volutpat. Vestibulum sit amet laoreet odio, quis ullamcorper tellus. Fusce elementum commodo massa et cursus. Pellentesque feugiat justo ac ipsum bibendum, eu viverra quam maximus. Donec consequat vestibulum nulla a mattis.</p>
					<p>Curabitur vehicula enim quis consequat ultrices. Aliquam non turpis egestas, malesuada ipsum quis, volutpat ligula. Etiam tincidunt est vel euismod cursus. Aliquam quis consectetur eros. Suspendisse non odio nunc. Suspendisse potenti. Aliquam augue neque, pellentesque quis sagittis id, vestibulum commodo erat. Fusce condimentum nisl ut sem laoreet convallis. In accumsan, ipsum posuere cursus gravida, sapien urna pretium lorem, eu elementum ligula lorem at mi. Etiam quis malesuada justo.</p>`,
					full_text_ru:`
					<p>Таким образом новая модель организационной деятельности играет важную роль в формировании позиций, занимаемых участниками в отношении поставленных задач. Равным образом новая модель организационной деятельности влечет за собой процесс внедрения и модернизации новых предложений. Таким образом сложившаяся структура организации требуют от нас анализа новых предложений. Не следует, однако забывать, что постоянный количественный рост и сфера нашей активности обеспечивает широкому кругу (специалистов) участие.</p>
					<p>Идейные соображения высшего порядка, а также консультация с широким активом представляет собой интересный эксперимент проверки модели развития. Таким образом дальнейшее развитие различных форм деятельности влечет за собой процесс внедрения и модернизации систем массового участия.</p>`,
				}
			],
			scrollSettings: {
				suppressScrollX: true
			},
			fullNews:null,
			newsShown:false,
			inProgress:false
		}
	},
	computed: {
		...mapGetters(['preferences']),
		fullContent: function() {
			let content = ''
			if(this.fullNews != null) {
				this.news.map(item => {
					if(item.id == this.fullNews) {
						content = this.preferences.lang == 'en' ? `<div class="content">${item.full_text_en}</div>` : `<div class="content">${item.full_text_ru}</div>`
						let title = this.preferences.lang == 'en' ? `<h2>${item.title_en}</h2>` : `<h2>${item.title_ru}</h2>`
						let date = `<div class='date'>${item.date}</div>`
						let img = `<div class='img-wrapper' style='background-image:url(${item.image})'>${date}${title}</div>`
						content = img+content
					}
				})
			}
			return content
		}
	},
	mounted: function (){
		
	},
	methods: {
		...mapActions([]),
		showFull: function(id) {
			this.fullNews = id
			this.newsShown = true
		},
		hideFull: function() {
			this.fullNews = null
			this.newsShown = false
		}
	}
}
</script>
