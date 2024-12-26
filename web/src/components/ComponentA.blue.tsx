import theme from "../theme"

function ComponentA() {
    return(<div style={{border: '1 solid black', padding: '4px', margin: '4px'}}>
        <h2 style={{color: theme.colors.primary}}>Web - Component A</h2>
        <p style={{color: theme.colors.primary}}>Text changes between branding: <strong>Blue</strong></p>
    </div>)
}

export default ComponentA