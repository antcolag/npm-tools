/**
 * Object extension tools.
 * @module
 * @see module:tools
 */

import {
	buildProperty,
	injectProperties
} from "./tools.mjs"
import {
	pipe,
	different
} from "./utils.mjs"

export const BINDS = Symbol("binds")

const HANDLERS = {
	bindable,
	bind,
	unbind
}

export default function reactive() {
	return injectProperties.call(this, HANDLERS)
}

function buildBinder (val, list, build) {
	var recurring = 0
	const setter = (v) => {
		if(recurring++){
			return
		}
		list.forEach(f=>f(v))
		recurring = 0
		return val = v
	}
	return build({
		set: setter,
		get: () => val
	})
}

function check(){
	buildProperty.call(this, BINDS, {})
	return this[BINDS]
}

function bindable(id, build = pipe) {
	const binds = check.call(this)
	if(binds[id]){
		return false
	}
	binds[id] = []
	const buildedBinder = buildBinder(this[id], binds[id], build)
	return Object.defineProperty(this, id, buildedBinder)
}

function bind(id, fun, name = id) {
	const binds = check.call(this)
	if(!binds[id]){
		return false
	}
	if(typeof fun == "object"){
		let who = fun
		fun = (x) => who[name] = x
	}
	binds[id].push(fun)
	return fun
}

function unbind(id, key) {
	const binds = check.call(this)
	const index = binds[id].indexOf(key)
	if(index < 0){
		return
	}
	binds[id].splice(index, 1)
}
