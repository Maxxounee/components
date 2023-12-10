<template>
	<div class="test">
		<div class="test__spacer"></div>
		<div class="test__container">
			<SoftSticky>
				<p class="test__text">
					Lorem ipsum dolor sit amet, consectetur
					adipisicing elit. Alias blanditiis est ipsa
					nihil perferendis quasi quia quisquam, sed
					unde ut!
				</p>
			</SoftSticky>
		</div>
		<div class="test__container">
			<SoftSticky>
				<p class="test__text">
					Lorem ipsum dolor sit amet, consectetur
					adipisicing elit. Alias blanditiis est ipsa
					nihil perferendis quasi quia quisquam, sed
					unde ut!
				</p>
			</SoftSticky>
		</div>
	</div>
</template>

<script>
export default {};
</script>

<style lang="scss">
* {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
}

.test {
	&__spacer {
		height: 30vh;
		background-color: moccasin;
	}

	&__container {
		height: 300vh;
		background-color: #2d001e;
	}

	&__text {
		position: relative;
		left: 50%;
		transform: translateX(-50%);

		width: 40vw;

		font-family: Helvetica, serif;
		font-size: 20px;
		color: #f3f3f3;
		text-align: center;
		text-transform: uppercase;
	}
}
</style>
