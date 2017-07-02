<template>
	<div id="app">
		<div id="app-6">
			<p>{{ message }}</p>
			<input v-model="message">
			<br>
			<input type="checkbox" id="checkbox" v-model="checked">
			<label for="checkbox">{{ checked }}</label>
		</div>
		<ul v-if="checked">
			<li v-for="l in liste"><span v-bind:id="l">{{l}}</span></li>
		</ul>
		<button class="button-outline" id="check1" @click="sort('name')">Sortieren</button>
		<button class="button-outline" id="check2" @click="sort('id')">Sortieren</button>
		<button v-for="element in tags" class="button-outline" @click="tagfilter(element)">{{element}}</button>
		<button class="button-outline" @click="filt=[];filter('show all')">Reset</button>
		<p>{{selected.name}} ({{selected.id}})</p>
		<isotope ref="cpt" :list="data" id="root_isotope" class="isoDefault" :options='getOptions()'
				 @filter="filterOption=arguments[0]">
			<div v-for="element in data" @click="selected=element" :key="element.id" class="block">
				{{element.name}}
				<br> {{element.id}}
				<br>
				<span>{{element.tags.join(",")}}</span>
			</div>
		</isotope>

	</div>
</template>

<script>
    import isotope from "vueisotope"
    import data from './data.json';
    export default {
        name: 'app',
        data () {
            return {
                id: "id",
                name: "name",
                msg: 'Welcome to Your Vue.js App',
                message: 'Das ist ein Test!',
                liste: [1, 2, 3, 4],
                tags: ['a', 'b', 'c', 'g'],
                checked: true,
                data: data,
                selected: data[0],
                filt: [],
            }
        },
        methods: {
            sort: function(key) {
                this.$refs.cpt.sort(key);
            },
            filter: function(key) {
                this.$refs.cpt.filter(key);
            },
            tagfilter: function(element) {
                if (this.filt.includes(element)) {
                    this.filt = this.filt.filter(item => item !== element)
                } else {
                    this.filt.push(element)
                }
                this.filter('contains')
            },
            getOptions: function() {
                return {
                    getSortData: {
                        id: "id",
                        name: "name"
                    },
                    sortBy: "name",
                    masonry: {
                        columnWidth: 70,
                        gutter: 5
                    },
                    getFilterData: {
                        "show all": function() {
                            return true;
                        },
                        number: function(el) {
                            return el.id > 30;
                        },
                        "test": (el) => {
                            console.log(el.tags.includes(this.filt[0]));
                            return true
                        },
                        "contains": (element) => {
                            if (this.filt.length === 0) {
                                return true;
                            }
                            let missing = false;
                            this.filt.forEach(function(selectedtag) {
                                if (!element.tags.includes(selectedtag)) {
                                    missing = true;
                                }
                            });
                            return !missing;

                        }
                    }
                };
            }

        },
        components: {
            isotope,
        }
    }
</script>

<style lang="scss">
	@import "../node_modules/milligram/src/milligram";

	#app {
		/*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
		/*-webkit-font-smoothing: antialiased;*/
		/*-moz-osx-font-smoothing: grayscale;*/
		text-align: center;
		/*color: #2c3e50;*/
		/*margin-top: 60px;*/
	}

	h1, h2 {
		font-weight: normal;
	}

	ul {
		list-style-type: none;
		padding: 0;
	}

	li {
		display: inline-block;
		margin: 0 10px;
	}

	.block {
		background-color: lightgray;
		padding: 10px;
		/*width: 50px;*/
		/*height: 50px;*/
	}
</style>
