export function croak(v){
	if(!DEBUGGING){
		return
	}
	throw v
}

function type_check(result, value, ...tests) {
	return tests.some((test) => {
			switch(true) {
			case typeof test == 'string':
				return result
				? test == value
				: tests != value;
			case (value instanceof test):
			case value.constructor == test:
				return result
			}
		}
	) || croak(value.constructor)
}

export function good(...tests) {
	return type_check(true, ...tests)
}

export function crap(...tests) {
	return type_check(false, ...tests)
}

export function pause() {
	if(!DEBUGGING){
		return
	}
	debugger
}

export function DEBUG(v) {
	DEBUGGING = v
}

export function ASSERT(expr, val) {
	return val === expr || croak(expr)
}

export function ASSERT_T(expr) {
	return ASSERT(true, !!expr)
}

export function ASSERT_F(expr) {
	return ASSERT(false, !!expr)
}

export let DEBUGGING = false
