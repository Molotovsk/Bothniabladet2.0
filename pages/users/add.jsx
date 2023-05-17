import { Layout, AddEdit } from 'components/users';

export default Add;

function Add() {
    return (
        <Layout>
            <h1>Lägg till ny användare</h1>
            <AddEdit />
        </Layout>
    );
}