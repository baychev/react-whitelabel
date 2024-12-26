import theme from "../theme"

function ComponentB() {

    return(<div style={{border: '1 solid black', padding: '4px', margin: '4px'}}>
        <h2 style={{color: theme.colors.primary}}>Web - Component B</h2>
        <p>Differs only in styling.</p>
    </div>)
}

export default ComponentB