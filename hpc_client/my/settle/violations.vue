<template>
	<view class="page-settle-violations">
		<cl-topbar title="咨询师违规条例"></cl-topbar>
		<view class="content">

			<cl-text bold class="three-title" value="1.原则"></cl-text>
			<cl-text class="text"
				value="我们一直专注于在线心理咨询平台的开发应用和心理咨询的每一个细节，致力于为广大来访者和心理咨询师打造中国最有价值的心理咨询服务平台。让每一个人都能享受到及时、专业的心理咨询服务，共同营造一个和谐、健康心理世界。">
			</cl-text>
			<cl-text class="text"
				value="为了更好的实现这一目标，保障平台咨询服务的质量，维护平台咨询师团队的健康发展，我们确定以下咨询师监管条例以及相应处理办法。不仅作为平台使用者一切权责的基础，更期待您与我们携手共同维护平台运营秩序，规范自律，互融共进。">
			</cl-text>
			<cl-text bold class="three-title" value="2.违规监管条例"></cl-text>
			<cl-text class="text" value="第一部分： 咨询师严重违规行为"></cl-text>
			<cl-text class="text" value="2.1 咨询师被用户投诉，且经过平台工作人员回访核实后投诉成立。"></cl-text>
			<cl-text class="text"
				value="2.2 进行虚假心理咨询。虚假心理咨询指不存在、不真实的预约咨询行为。主要指通过不正当方式获得预约数、好评、咨询时长等不当利益，妨害预约者权益行为。包括但不限于："></cl-text>
			<cl-text class="text" value="1）来访者虚假。并非真实的来访者，进行预约咨询服务，或把线下已完成的咨询，重新在平台上预约，但却未真实完成心理咨询服务。"></cl-text>
			<cl-text class="text" value="2）评价虚假。咨询师通过利诱、施压、骚扰等形式让预约者给出好评。"></cl-text>
			<cl-text class="text" value="2.3 咨询师以不当形式的广告宣传推销自己。包括但不限于："></cl-text>
			<cl-text class="text" value="1）咨询师通过问答，文章留言或者是私信等方式诱导来访者，进行预约咨询。"></cl-text>
			<cl-text class="text" value="2）咨询师通过平台互动方式（如私信/评论等），对来访者进行推销，骚扰。"></cl-text>
			<cl-text class="text"
				:value="'2.4 '+appName+'认证咨询师在其他平台或者'+appName+'问答区，文章留言区对'+appName+'平台、其他咨询师或他人进行人身攻击、诽谤、诋毁等不当言论。'">
			</cl-text>
			<cl-text class="text" :value="'2.5 咨询师将从'+appName+'接待的来访者，以任何理由形式脱离'+appName+'预约。'"></cl-text>
			<cl-text class="text"
				:value="'当来访者提出要脱离平台进行付款，或对'+appName+'平台预约流程有疑问时，咨询师有责任引导来访者继续使用平台付款，或者联系'+appName+'工作人员。若没有联系'+appName+'工作人员，擅自脱离和来访者有金钱接触，一律做违规处理。'">
			</cl-text>
			<cl-text class="text" :value="'2.7 咨询师以任何名义代替'+appName+'向来访者收取费用。'"></cl-text>
			<cl-text class="text" value="2.8 咨询师和来访者产生除开咨访关系以外的其他非专业关系，包括但不仅限于以下几点："></cl-text>
			<cl-text class="text" value="1）咨询师与当前的来访者、来访者的配偶或家庭成员发生性关系或亲密关系；"></cl-text>
			<cl-text class="text" value="2）咨询师在与来访者结束咨询关系之后五年内，与之、或其配偶、或家庭成员发生性关系或亲密关系；"></cl-text>
			<cl-text class="text" value="3）咨询师与当前或之前的来访者以及其亲密伴侣、家庭成员之间产生非专业关系，除非此种关系对来访者有利，且咨询师必须事先有所备案；"></cl-text>
			<cl-text class="text" value="2.9 关于咨询师收取来访者礼品相关规定，包括但不仅限于："></cl-text>
			<cl-text class="text" value="1） 咨询师以任何形式暗示来访者支付其它私人报酬，或赠送礼物；"></cl-text>
			<cl-text class="text" value="2） 咨询师采用欺诈或不正当的手段，利用咨询关系向来访者推销产品或相关的培训。"></cl-text>
			<cl-text class="text" value="2.10 咨询师对来访者进行骚扰或者纵容来访者对咨询师的骚扰，包括性诱惑、身体上的接触、或带有性意味的。或给来访者带来压力、紧张、冒犯等言语或非言语行为。">
			</cl-text>
			<cl-text class="text" value="2.11 违反咨询相关法律行为："></cl-text>
			<cl-text class="text" value="1） 心理咨询师从事超出心理咨询服务范围的诊断或者治疗，其中包括心理咨询治疗或者精神障碍的诊断或治疗。"></cl-text>
			<cl-text class="text" value="2） 发现来访者可能会患有精神障碍时，未建议其到符合法律规定的医疗机构就诊。"></cl-text>
			<cl-text class="text" value="3） 在咨询服务中造成来访者或相关他人人身、财产或其他损害。"></cl-text>
			<cl-text class="text" value="第二部分：咨询师其他违规行为"></cl-text>
			<cl-text class="text" value="2.12 对未成年人或无法行使【知情同意权】的人咨询，咨询师未采取必要措施得到来访者的同意，未考虑本人的意愿和最佳利益。"></cl-text>
			<cl-text class="text" value="2.13 没有在征得当事人或其法律代表同意，对咨询过程中进行录音或录像，记录未做好安全存放；"></cl-text>
			<cl-text class="text" :value="'2.14 咨询师接受'+appName+'来访者除平台公开咨询费用外的其他私人付费或其他形式的报酬；'"></cl-text>
			<cl-text class="text" value="2.15 咨询师在咨询过程中放弃或是忽视来访者。因咨询师师私人原因或节假日无法提供咨询服务，未提前做出适当的安排；"></cl-text>
			<cl-text class="text" value="2.16 咨询师进行转介时，未保证临床和行政程序的完整性，未与来访者以及转介咨询师进行公开的交流。"></cl-text>
			<cl-text bold class="three-title" value="3.违规处罚"></cl-text>
			<cl-text class="text" :value="'3.1 触范条例《第一部分：咨询师严重违规行为》中的任意违规行为，平台将取消其'+appName+'咨询师身份，其中，触范第2.8条、第2.9条、第2.10条、第2.11条的将对其账户封禁处理。'"></cl-text>
			<cl-text class="text" value="3.2 触范条例《第二部分：咨询师其他违规行为》中的任意违规行为，平台将对其咨询师的咨询服务做为期7-14个工作日不等的下架处理。"></cl-text>
			<cl-text class="text" value="3.3 如若对本处罚条例有异议或疑问，可向平台客服提供证据申诉，平台会重新进行相关资质审核，必要时开启专业面试。重新审核后的结果将作为最终依据，咨询师再次提出异议将不被纳入考虑。"></cl-text>
			<cl-text bold class="three-title" value="4.动态文档"></cl-text>
			<cl-text class="text" value="本咨询师违规条例为动态文档，我们有权根据相关法律法规更新或产品运营的需要对其内容进行修改并更新，你应能反复查看以便获得最新信息。"></cl-text>
			<cl-text class="text" :value="appName+'有以上信息内容的最终解释权。'"></cl-text>

		</view>
	</view>
</template>

<script>
	import {
		allCfg
	} from '@/components/comm/allCfg'
	export default {
		data() {
			return {
				appName: allCfg.const.appName
			}
		},
		created() {

		}
	}
</script>

<style lang="scss" scoped>
	@import "@/my/article.scss";
</style>
