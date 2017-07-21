
export class MockDataStorage {
    static getData(key: string) {
        if (!localStorage.getItem(key)) {
            localStorage.setItem(key, JSON.stringify(mock[key]));
        }
        return localStorage.getItem(key);
    }

    static addData(key : string, value : Object ){
        let container: Object[] = [];
        if (!localStorage.getItem(key)) {
            container.push(value);
            localStorage.setItem(key, JSON.stringify(container));
        }else {
            let data = JSON.parse(localStorage.getItem(key));
            if(typeof data !== 'object'){
                data = container;
                container.push(value);
            }else {
                data.push(value);
            }
            localStorage.setItem(key, JSON.stringify(data));
        }
    }

}


const mock : Object = {
    'users'  : [
        {id : 1, username: 'sa', password : 'sa'},
        {id : 2, username: 'sa1', password : 'sa'}
    ]
}