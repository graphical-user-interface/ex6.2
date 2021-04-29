import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import {
	Container,
	Paper,
	Typography,
	TextField,
	RadioGroup,
	Radio,
	FormControlLabel,
} from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		margin: theme.spacing(2),
		padding: theme.spacing(2, 1),
	},
	input: {
		marginLeft: 10,
		marginTop: 3,
		height: 30,
		width: 100,
	},
	equal: {
		marginLeft: 30,
		marginRight: 30,
	},
}))

export default function App() {
	const classes = useStyles()
	const [time, setTime] = useState(new Date())
	const [currency, setCurrency] = useState(1)
	const [currencyValue, setCurrencyValue] = useState("eur")

	const convertTime = (time) => {
		return time.toUTCString()
	}
	const handleChange = (e) => {
		setCurrencyValue(e.target.value)
	}
	const handleCurrencyChange = (e) => {
		setCurrency(e.target.value)
	}
	const convertCurrency = (currency) => {
		if (currencyValue === "eur") {
			return (currency * 1.21).toFixed(2)
		} else {
			return (currency / 1.21).toFixed(2)
		}
	}
	useEffect(() => {
		setTimeout(() => {
			setTime(new Date())
		}, 1000)
	}, [time])
	return (
		<div className={classes.root}>
			<Container maxWidth='sm'>
				<Paper elevation={2} className={classes.paper}>
					<Typography variant='h6'>
						Exchange rate at <br /> {convertTime(time)} <br /> is
						<TextField
							InputProps={{
								className: classes.input,
								inputProps: { min: 1 },
							}}
							defaultValue={1}
							type='number'
							variant='outlined'
							onChange={handleCurrencyChange}
						/>
						<span className={classes.equal}>=</span>
						{currencyValue === "eur"
							? `${convertCurrency(currency)}€`
							: `$${convertCurrency(currency)}`}
					</Typography>
					<RadioGroup
						aria-label='gender'
						name='currencies'
						value={currencyValue}
						onChange={handleChange}>
						<FormControlLabel
							value='eur'
							control={<Radio />}
							label='€ to $'
						/>
						<FormControlLabel
							value='usd'
							control={<Radio />}
							label='$ to €'
						/>
					</RadioGroup>
				</Paper>
			</Container>
		</div>
	)
}
