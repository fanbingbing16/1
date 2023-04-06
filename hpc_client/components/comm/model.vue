<template>
	<cl-dialog :title="title" :visible.sync="visible">
		<slot></slot>
		<text v-if="content">{{content}}</text>
	</cl-dialog>
</template>

<script lang="ts">
	export default {
		name: 'Model',
		props: {
			title: {
				
				default: ''
			},
			visible: {
				
				default: false
			},
			content:{
				
				default:''
			}
		}
	}
</script>

<style>
</style>
