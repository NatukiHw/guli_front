<template>
	<div class="orderStatusPage">
		<h1 class="tips">{{contentText}}</h1>
	</div>
</template>

<script>
	import orderApi from "~/apis/order";

	export default {
		data() {
			return {
				order: null,
			};
		},
		created() {
			this.loadOrderStatus();
		},
		methods: {
			loadOrderStatus() {
				let orderNo = this.$route.query.out_trade_no;
				orderApi.getOrder(orderNo).then((resp) => {
					if (resp.success) {
						this.order = resp.data.order;
					}
				});
			},
		},
		computed: {
			contentText() {
				if (this.order == null) {
					return "正在检查订单支付状态";
				} else if (this.order.status == 0) {
					setTimeout(() => {this.loadOrderStatus()}, 3000);
					return "等待支付中";
				} else if (this.order.status == 1 || this.order.status == 2) {
					setTimeout(() => {window.location.href = `/course/${this.order.courseId}`}, 3000);
					return "支付成功, 正在跳转";
				} else if (this.order.status == 3) {
					return "交易关闭";
				}
			},
		},
	};
</script>

<style>
	.orderStatusPage .tips {
		font-size: 30px;
		font-weight: 800;
	}
</style>