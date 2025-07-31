
import {
    XAxis, YAxis, Tooltip, Label, Legend, CartesianGrid, ResponsiveContainer, LineChart, Line,
    ReferenceLine
} from "recharts";


function Graph(props) {

    let rang = [0, 'auto']
    if (props.name === 'Sex Ratio') {
        rang = [800, 1050]
    }
    else if (props.name === 'Literacy Rate') {
        rang = [0, 100]
    }


    return (
        <ResponsiveContainer width={'90%'} height={420}>
            <LineChart data={props.data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickCount={6} domain={rang}>
                    <Label
                        style={{
                            textAnchor: "middle",
                            fontSize: "125%",
                        }}
                        angle={270}
                        value={props.name} />
                </YAxis>

                <Tooltip />
                <Legend />
                <Line dataKey="val" stroke="#8884d8" strokeWidth={3} r={5} name={props.name} type='monotone' isAnimationActive={false} />
                {props.name === 'Sex Ratio' && <ReferenceLine y={1000} stroke="red" strokeDasharray="3 3" />}
            </LineChart></ResponsiveContainer>
    )
}

export default Graph;