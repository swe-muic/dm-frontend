import React from 'react';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import { FormControl, FormControlLabel, FormLabel, Popover, Radio, RadioGroup } from '@mui/material';
import LineStyling from '../../../style/LineStyling';
import IconButton from '@mui/material/IconButton';
import { HexColorInput, HexColorPicker } from 'react-colorful';
import Box from '@mui/material/Box';
import LineStyleEnum from '../../../enum/LineStyleEnum';
import Stack from '@mui/material/Stack';

export interface LineStyleProp {
	color: string;
	lineStyle: string;
	handleColorChange: (value: string) => void;
	handleLineStyleChange: (value: string) => void;
}

function LineStylePopover(props: LineStyleProp): React.ReactElement {
	const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
	const { color, lineStyle, handleColorChange, handleLineStyleChange } = props;
	const defaultRadioValue = lineStyle === LineStyleEnum.SOLID ? LineStyleEnum.SOLID : LineStyleEnum.DOTTED;
	const [checked, setChecked] = React.useState(false);

	const handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void = (event) => {
		if (anchorEl != null) {
			// eslint-disable-next-line no-use-before-define
			handleClose();
		} else {
			setAnchorEl(event.currentTarget);
		}
	};

	const handleClose: () => void = () => {
		setAnchorEl(null);
	};
	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	return (
		<Box>
			<IconButton onClick={handleClick} data-testid={'selector-button'}>
				<Brightness1Icon style={{ ...LineStyling, color: `${color}` }} />
			</IconButton>
			<Popover
				data-testid={'color-pick'}
				id={id}
				open={Boolean(anchorEl)}
				onClose={handleClose}
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
			>
				<Box sx={{ p: 2 }}>
					<Stack direction={'column'} spacing={2}>
						<HexColorPicker
							data-testid={'color-wheel'}
							color={color}
							onChange={(newColor) => {
								/* istanbul ignore next */
								handleColorChange(newColor);
							}}
						/>
						<HexColorInput
							data-testid={'color-input'}
							color={color}
							onChange={(newColor) => {
								handleColorChange(newColor);
							}}
						/>
					</Stack>
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
								handleLineStyleChange(event.target.value);
								setChecked(!checked);
							}}
						>
							<FormControlLabel value={LineStyleEnum.SOLID} control={<Radio />} label='Solid' />
							<FormControlLabel value={LineStyleEnum.DOTTED} control={<Radio />} label='Dotted' />
						</RadioGroup>
					</FormControl>
				</Box>
			</Popover>
		</Box>
	);
}

export default LineStylePopover;
