import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';
import React from 'react';
import "antd/dist/antd.css";

const onChange: DatePickerProps['onChange'] = (date, dateString) => {
  console.log(date, dateString);
};

const Date: React.FC = () => (
    <DatePicker onChange={onChange} />
);

export default Date;