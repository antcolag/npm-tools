/**
 * Object extension tools.
 * @module
 */

/**
 * do nothing
 */
export function noop(){}

/**
 * Pipes value
 * @param {any} v
 * @returns {any} the same value in input
 */
export function pipe(v){
	return v
}

/**
 * Pipes the arguments array
 * @param {...any} v
 * @returns {...any}
 */
export function fullpipe(){
	return arguments
}

/**
 * returns true
 */
export function yes(){
	return true
}

/**
 * returns false
 */
export function no(){
	return false
}

/**
 * continue the execution after t milliseconds
 * @param {number} t
 * @returns {Promise}
 */
export function delay(t) {
	return new Promise((resolve)=>setTimeout(resolve, t))
}

/**
 * defer a function
 * @param {function} f
 * @param {number} t
 * @param {...any} args
 * @returns {Promise}
 */
export async function defer(t, f, ...args) {
	await delay(t)
	return f(...args)
}

/**
 * Debunce an handler
 * @param {function} f
 * @param {number} t
 */
export function debounce(f, t = 100) {
	var last, self
	return function debouncing (...args){
		self = this
		if(last){
			last = args
			return
		}
		last = args
		defer(t, () => {
			f.apply(self, last)
			last = void 0
		})
	}
}

/**
 * apply a function to arguments
 * @
 * @param {function} f
 * @param {...any} args
 */
export function apply(f, ...args) {
	return f(...args)
}

/**
 * return a function that apply a handler to arguments
 * @
 * @param {function} f
 * @param {...any} values
 */
export function applyWithConst(f, ...values){
	return (obj) => f(obj, ...values)
}

/**
 * performs a strict equal comparison
 * @
 * @param {any} obj
 * @param {any} value
 */
export function equals(obj, value){
	return obj === value
}

/**
 * performs a strict different comparison
 * @
 * @param {any} obj
 * @param {any} value
 */
export function different(obj, value){
	return obj !== value
}

/**
 * generator for comparison functions with constant values
 * @function
 * @param {any} value
 * @param {any} costant
 */
export const compareWhitConst = applyWithConst.bind(void 0, equals)

/**
 * @function
 * @param {any} value
 */
export const isNull = compareWhitConst(null)

/**
 * @function
 * @param {any} value
 */
export const isUndefined = compareWhitConst(void 0)

/**
 * @function
 * @param {any} value
 */
export const isTrue = compareWhitConst(true)

/**
 * @function
 * @param {any} value
 */
export const isFalse = compareWhitConst(false)

/**
 * it sets one or more copule of key value pair
 * passed plain to a function
 * ie
 * var o = {}
 * properties.call(o, 'foo', true, 'bar', false)
 * console.log(o) -> {foo:true, bar:false}
 *
 * @param {*} name
 * @param {*} value
 * @param {*} filter
 */
export function properties(name, value, ...args) {
	this[name] = value
	return args.length? properties.apply(this, args) : this
}

export class Semaphore {
	constructor() {
		this.promise = new Promise((resolve, reject)=>{
			this.resolve = resolve
			this.reject = reject
		})
	}
}