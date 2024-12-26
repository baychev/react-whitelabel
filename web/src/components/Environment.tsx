function Environment() {
    const env = process.env.NODE_ENV ?? "unknown"
    
    return (<h2>Environment: {env}</h2>)
}

export default Environment