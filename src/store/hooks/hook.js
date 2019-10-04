import  { refreshToken } from "../actions/users";


let buffer = [];

export const jwt = store => next => action => {
	buffer.push(action);
	let theStore = store.getState();
		if (action.type === 'INVALID_TOKEN') {
				console.log("expired")
				/* expired */ 
				if(!theStore.fetching){
				   store.dispatch({ type: 'LOAD_FETCHING' })
					return store.dispatch(refreshToken({data:{userId:localStorage.getItem("uuid")}}))
					.then(()=>{ 
						store.dispatch({ type: 'LOAD_FETCHING' })
						let pos = buffer.map(e => e.type).indexOf('INVALID_TOKEN') - 1;
						for (var i = pos; i > -1; i -= 1) {
							if (typeof buffer[i] === 'function') {
								//console.log(buffer[i](store.dispatch).then((r)=> console.log(r)))
								store.dispatch({
									type: 'RESEND',
								    action: buffer[i](store.dispatch)
								}).then((r)=> console.log(r));
								break;
							}
						}
						buffer = [];
					})
				}
				return next(action);
		}else{
			if (buffer.length > 20) {
				//remove all items but keep the last 20 which forms the buffer
				buffer.splice(0, buffer.length - 20);
			}
			return next(action);		
		}		
};