import theme from "../../theme"

function Brand() {
    const brand = process.env.BRAND ?? 'Default'

    return(<h2 style={{color: theme.colors.primary}}>Brand: {brand}</h2>)
}

export default Brand