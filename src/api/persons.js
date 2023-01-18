import data from '../assets/MOCK_DATA.json';

export const get_persons = ()=>new Promise((resolve) => {
    setTimeout(() => {
        resolve(data);
    }, 300);
});
export const get_person = (id)=>new Promise((resolve) => {
    setTimeout(() => {
        const person = data.find(person=>person.id===id)
        resolve(person);
    }, 300);
});