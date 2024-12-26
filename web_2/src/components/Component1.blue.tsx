import theme from "./theme"

function Component1() {
    return(<div style={{border: '1 solid black', padding: '4px', margin: '4px'}}>
        <h2 style={{color: theme.colors.primary}}>Web 2 - Component 1</h2>
        <p style={{color: theme.colors.primary}}>Text changes between branding: Blue</p>
    </div>)
}

export default Component1