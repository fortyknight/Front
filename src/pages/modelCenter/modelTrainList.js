import React from 'react';
import { withRouter } from 'umi';
import { Dropdown, Spin, Table, Tooltip } from 'antd';
import { CheckOutlined, CloseOutlined, LoadingOutlined } from '@ant-design/icons';
import { convertByteUnits, getDuration, makeTableHeader, makeToolTip, makeToolTipFromMsgId } from '@/utils/util';
import { formatMessage } from 'umi-plugin-locale';

const antIcon = <LoadingOutlined style={{ fontSize: 16 }} spin />;
const columns = [
    {
        title: '',
        dataIndex: 'status',
        key: 'status',
        render: (_, record) => {
            if (record.status === 'running') {
                return (
                    <Spin indicator={antIcon} />
                );
            } else if (record.status === 'succeed') {
                return (
                    <CheckOutlined style={{ fontSize: 16, color: 'green' }} />
                )
            } else if (record.status === 'failed') {
                return (
                    <CloseOutlined style={{ fontSize: 16, color: 'red' }} />
                )
            }
        }
    },
    {
        title: '实验序号',
        dataIndex: 'no_experiment',
        key: 'no_experiment',
        render: (text) => <a>{text}</a>,
    },
    {
        title: '模型',
        dataIndex: 'engine',
        key: 'engine',
    },
    {
        title: '训练模式',
        dataIndex: 'train_mode',
        key: 'train_mode',
    },
    {
        title: '指标',
        key: 'score',
        dataIndex: 'score',
        render: (text, record, index) => {
            const val = record.score;
            if (val) {
                return (
                    <Tooltip placement="right" color={'white'} title={formatMessage({ id: 'center.hintTargetCol' }, { targetCol: record.target_col })}>
                        <span>{val.toFixed(6)}({this.metricDisplayMapping[record.metric_name]})</span>
                    </Tooltip>
                )
            } else {
                return (
                    <span>-</span>
                )
            }
        }
    },
    {
        title: '预计剩余时间',
        dataIndex: 'estimated_remaining_time',
        key: 'estimated_remaining_time',
        render: (val) => {
            if (val === 0) {
                return (
                    <span>{formatMessage({ id: 'center.finished' })}</span>
                )
            } else if (val) {
                const sty = val > 3600 ? { color: 'red' } : {}
                return (
                    <span style={sty}>{getDuration(val)}</span>
                )
            } else {
                return <span>-</span>
            }
        }
    },
    {
        title: '耗时',
        dataIndex: 'escaped',
        key: 'escaped',
        render: (val) => {
            const sty = val > 3600 ? { color: 'red' } : {}
            return (
                <span style={sty}>{getDuration(val)}</span>
            )
        }
    },
    {
        title: '大小',
        dataIndex: 'model_file_size',
        key: 'model_file_size',
        render: (val) => {
            if (val) {
                return (
                    <span>{convertByteUnits(val)}</span>
                )
            } else {
                return (
                    <span>-</span>
                )
            }
        }
    },
    {
        title: '资源',
        dataIndex: 'train_notebook_uri',
        align: 'center',
        key: 'train_notebook_uri',
        render: (text, record, index) => {
            return (
                <Dropdown overlay={this.getOptionMenu(record)} placement='bottomCenter'>
                    <a>...</a>
                </Dropdown>
            )
        }
    },
];
const data = [];
const ModelTrainList = () => {
    return (
        <Table columns={columns} />
    )
};

export default withRouter(ModelTrainList);