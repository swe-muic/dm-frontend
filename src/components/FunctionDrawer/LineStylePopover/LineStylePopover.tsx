import React from 'react';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import { FormControl, FormControlLabel, FormLabel, Popover, Radio, RadioGroup } from '@mui/material';
import LineStyling from '../../../style/LineStyling';
import IconButton from '@mui/material/IconButton';
import { HexColorPicker } from 'react-colorful';
import Box from '@mui/material/Box';

export interface LineStyleProp {
	color: string;
	lineStyle: string;
	index: number;
	handleColorChange: (index: number, value: string) => void;
	handleLineStyleChange: (index: number, value: string) => void;
}

function LineStylePopover(props: LineStyleProp): React.ReactElement {
	const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
	const { color, index, lineStyle, handleColorChange, handleLineStyleChange } = props;
	const defaultRadioValue = lineStyle === 'polyline' ? 'polyline' : 'scatter';
	const [checked, setChecked] = React.useState(false);

	const handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose: () => void = () => {
		setAnchorEl(null);
	};
	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	return (
		<Box>
			<IconButton onClick={handleClick}>
				<Brightness1Icon style={{ ...LineStyling, color: `${color}` }} />
			</IconButton>
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
			>
				<Box sx={{ p: 2 }}>
					<HexColorPicker
						color={color}
						onChange={(newColor) => {
							handleColorChange(index, newColor);
						}}
					/>
					<FormControl>
						<FormLabel style={{ fontWeight: 'bolder', alignSelf: 'center' }} sx={{ mt: 2 }}>
							Select Line Style
						</FormLabel>
						<RadioGroup
							aria-labelledby='line-style-radio-group'
							value={defaultRadioValue}
							name='radio-buttons-group'
							aria-checked={checked}
							defaultChecked={checked}
							onChange={(event) => {
								handleLineStyleChange(index, event.target.value);
								setChecked(!checked);
							}}
						>
							<FormControlLabel value='polyline' control={<Radio />} label='Solid' />
							<FormControlLabel value='scatter' control={<Radio />} label='Dotted' />
						</RadioGroup>
					</FormControl>
				</Box>
			</Popover>
		</Box>
	);
}

export default LineStylePopover;
