import React, { useState, createRef } from 'react';
import { Week } from './';
import { Grid, Slide, IconButton, Tooltip } from '@material-ui/core';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

const Container = (props) => {
	const [checked, setChecked] = useState(2); // 현재 몇번째 페이지인지 체크
	const dayOneWeekBefore = props.day; // 일주일 전 날짜 요일

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
				{checked!==1 &&
					<Tooltip title="저번 주" placement="bottom" ref={prevArrow}>
						<IconButton onClick={prevWeek}>
							<KeyboardArrowUpIcon/>
						</IconButton>
					</Tooltip>
				}
			</Grid>
			<Grid className="card-con">
				{
					dayOneWeekBefore && // 3주 간의 계획만 표시
					<>
						{
							[1,2,3].map((value) => (
								<Slide direction="right" in={(checked===value)} style={{ transitionDelay: (checked===value) ? '400ms' : '0ms' }} mountOnEnter unmountOnExit>
									<Week
										day={new Date(new Date(dayOneWeekBefore).setDate(dayOneWeekBefore.getDate()+(value-1)*7))} // 7일씩 표시
										plan = {props.plan}
										changePlan = {props.changePlan}
										deletePlan = {props.deletePlan}
										addPlan = {props.addPlan}
										ref = {weekRef}
									/>
								</Slide>
							))
						}
					</>
				}
			</Grid>
			<Grid className="icon-box">
				{checked!==3 &&
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