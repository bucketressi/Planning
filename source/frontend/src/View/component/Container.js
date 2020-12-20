import React, { useState, createRef } from 'react';
import { Week } from './';
import { Grid, Slide, IconButton, Tooltip } from '@material-ui/core';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

const Container = (props) => {
	const [checked, setChecked] = useState(2);
	const day = props.day;

	const prevArrow = createRef();
	const nextArrow = createRef();
	const weekRef = createRef();

	const nextWeek = () => {
		setChecked(checked+1);
	}
	const prevWeek = () => {
		setChecked(checked-1);
	}

	return(
		<Grid className="container-h">
			<Grid className="icon-box">
				{checked===1?
					undefined:
					<Tooltip title="저번 주" placement="bottom" ref={prevArrow}>
						<IconButton onClick={prevWeek}>
							<KeyboardArrowUpIcon/>
						</IconButton>
					</Tooltip>
				}
			</Grid>
			<Grid className="card-con">
				{
					day===undefined?
					undefined:
					<>
						<Slide direction="right" in={(checked===1)} style={{ transitionDelay: (checked===1) ? '400ms' : '0ms' }} mountOnEnter unmountOnExit>
							<Week
								day={new Date(new Date(day).setDate(day.getDate()-7))}
								plan = {props.plan}
								changePlan = {props.changePlan}
								deletePlan = {props.deletePlan}
								addPlan = {props.addPlan}
								ref = {weekRef}
							/>
						</Slide>
						<Slide direction="right" in={(checked===2)} style={{ transitionDelay: (checked===2) ? '400ms' : '0ms' }} mountOnEnter unmountOnExit>
							<Week
								day={day}
								plan = {props.plan}
								changePlan = {props.changePlan}
								deletePlan = {props.deletePlan}
								addPlan = {props.addPlan}
								ref = {weekRef}
							/>
						</Slide>
						<Slide direction="right" in={(checked===3)} style={{ transitionDelay: (checked===3) ? '400ms' : '0ms' }} mountOnEnter unmountOnExit>
							<Week
								day={new Date(new Date(day).setDate(day.getDate()+7))}
								plan = {props.plan}
								changePlan = {props.changePlan}
								deletePlan = {props.deletePlan}
								addPlan = {props.addPlan}
								ref = {weekRef}
							/>
						</Slide>
					</>
				}
			</Grid>
			<Grid className="icon-box">
				{checked===3?
					undefined:
					<Tooltip title="다음 주" placement="top" ref={nextArrow}>
						<IconButton onClick={nextWeek}>
							<KeyboardArrowDownIcon/>
						</IconButton>
					</Tooltip>
				}
			</Grid>
		</Grid>
	);
};

export default Container;