import React, { useState, useEffect } from 'react';
import { Layout, Input, Button, List, Avatar, Menu, Card } from 'antd';
import styles from './index.less';

import request from "@/config/request";

const { Header, Content, Footer, Sider } = Layout;
const { TextArea } = Input;


const LargeModel = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedRole, setSelectedRole] = useState('dave'); // 初始选择用户角色
  const [chatImage, setChatImage] = useState(1);
  const [sceneHint, setsceneHint] = useState('');
  const [sceneHint_2, setsceneHint_2] = useState('');
  const [agentModel_1, setAgentModel_1] = useState('');
  const [agentModel_2, setAgentModel_2] = useState('');
  const [agentModel_3, setAgentModel_3] = useState('');
  const [agentModel_4, setAgentModel_4] = useState('');
  const [responseInternet, setResponse] = useState('');
  const robotDave = '大家好，我是 Dave，一款带吸盘抓取器的人形机器人。我专门负责桌子的左侧，能够灵活地抓取和放置各种食材。我的任务是确保所有食材按照正确的顺序堆叠在一起，以制作出美味的三明治。我的抓取器状态会实时显示我是否持有物品，这样我可以在不同的任务之间高效地切换。无论是抓取新鲜的生菜、切好的番茄，还是放置香喷喷的火腿片，我都能胜任。让我和我的伙伴 Chad 一起，为你们制作出最完美的三明治吧！'
  const robotChad = '大家好，我是 Chad，一款配备吸盘抓取器的 R5E 机器人。我负责桌子的右侧，专门抓取和处理这边的食材。我和 Dave 是最佳拍档，我们会轮流操作，确保每一种食材都被正确地堆叠起来。我会实时监控我的抓取器状态，确保每一次操作都准确无误。无论是抓取新鲜的面包片、奶酪，还是放置美味的火腿片，我都能轻松应对。和我的伙伴 Dave 一起，我们会为你们制作出最美味的三明治！'
  const robotAlice = '大家好，我是 Alice，一款配备吸盘抓取器的 UR5E 机器人。我手持一个簸箕，专门负责将正方体垃圾收集并倾倒进垃圾箱。我的任务是与我的伙伴 Bob 一起，共同清扫正方体垃圾。我会实时监控正方体的位置，确保它们从桌面上被扫进簸箕里，然后再倾倒进垃圾箱。无论是移动正方体、等待时机，还是倾倒垃圾，我都能高效完成。让我们一起保持环境的整洁吧！'
  const robotBob = '大家好，我是 Bob，一款配备吸盘抓取器的 Franka Panda 机器人。我手持一把扫帚，专门负责将正方体垃圾扫进 Alice 的簸箕里。我的任务是与 Alice 协作，共同完成清扫工作。我会实时监控正方体的位置，确保它们被准确地扫进簸箕里。无论是移动正方体、扫除垃圾，还是等待时机，我都能胜任。和 Alice 一起，我们会确保每一个正方体垃圾都被妥善处理！'

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response_1 = await request.get('/api/llm/sandwich/intro');
      const response_2 = await request.get('/api/llm/sweep/intro');
      const response_3 = await request.get('/api/llm/sandwich/prompt', {
        params: {
          agent_name: 'Dave',
        },
      });
      const response_4 = await request.get('/api/llm/sandwich/prompt', {
        params: {
          agent_name: 'Chad',
        },
      });
      const response_5 = await request.get('/api/llm/sweep/prompt', {
        params: {
          agent_name: 'Alice',
        },
      });
      const response_6 = await request.get('/api/llm/sweep/prompt', {
        params: {
          agent_name: 'Bob',
        },
      });
      setsceneHint(response_1.data.data);
      setsceneHint_2(response_2.data.data);
      setAgentModel_1(response_3.data.data);
      setAgentModel_2(response_4.data.data);
      setAgentModel_3(response_5.data.data);
      setAgentModel_4(response_6.data.data);

    } catch (error) {
      console.error(error);
    }
  };
  const handleSend = async () => {
    if (inputValue.trim()) {
      // 添加用户消息到聊天
      setMessages([...messages, { sender: 'user', text: inputValue }]);
      setInputValue('');


      const response = chatImage === 1
        ? await request.get('/api/llm/sandwich/query', {
          params: {
            agent_name: 'Dave',
          },
        })
        : chatImage === 2
          ? await request.get('/api/llm/sandwich/query', {
            params: {
              agent_name: 'Chad',
            },
          })
          : chatImage === 3
            ? await request.get('/api/llm/sweep/query', {
              params: {
                agent_name: 'Alice',
              },
            })
            : await request.get('/api/llm/sandwich/query', {
              params: {
                agent_name: 'Bob',
              },
            })
      setResponse(response.data.data)

      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: selectedRole, text: responseInternet },
      ]);

    }
  };

  const generateResponse = (message) => {
    // 此函数可替换为获取真实响应的 API 调用
    return `${message}`;
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  const handleMenuClick = (role, image) => {
    setSelectedRole(role);
    setChatImage(image);
    setMessages([]); // 清空对话框
  };
  const { SubMenu } = Menu;

  return (
    <Layout className="layout" theme="light">
<Sider width={200} theme="light">
<Menu mode="inline" defaultOpenKeys={['sandwich', 'sweep']}>
          <SubMenu key="sandwich" title={<span style={{ fontSize: '24px' }}>{'三明治'}</span>}>
            <Menu.Item key="dave" onClick={() => handleMenuClick('dave', 1)}>
              <span style={{ fontSize: '20px' }}>{'Dave'}</span>
            </Menu.Item>
            <Menu.Item key="chad" onClick={() => handleMenuClick('chad', 2)}>
              <span style={{ fontSize: '20px' }}>{'Chad'}</span>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sweep" title={<span style={{ fontSize: '24px' }}>{'扫地'}</span>}>
            <Menu.Item key="alice" onClick={() => handleMenuClick('alice', 3)}>
              <span style={{ fontSize: '20px' }}>{'Alice'}</span>
            </Menu.Item>
            <Menu.Item key="bob" onClick={() => handleMenuClick('bob', 4)}>
              <span style={{ fontSize: '20px' }}>{'Bob'}</span>
            </Menu.Item>
          </SubMenu>
        </Menu>
</Sider>
      <Layout className="layout" style={{ backgroundColor: 'white' }}>
        <Content style={{ padding: '0 50px', marginTop: '20px', height: '1000px', backgroundColor: 'white', borderLeft: '2px solid #e8e8e8' }}>
          <div style={{ display: 'flex' }}>
            <img src={(chatImage === 1 || chatImage === 2) ? require('./image2.png') : require('./image_1.png')} alt="Chat" style={{ width: 'auto', height: '300px', marginBottom: '20px' }} />
            <div className={styles.singleArrow} style={{ marginLeft: '60px', marginTop: '100px' }}></div>
            <video
              width="auto"
              height="260px"
              controls
              style={{
                objectFit: 'contain',
                marginLeft: '70px',
                marginTop: '40px'
              }}
              key={chatImage}
            >
              <source src={(chatImage === 1 || chatImage === 2) ? require('./video1.mp4') : require('./video2.mp4')} type="video/mp4" />
            </video>
          </div>

          <div
            style={{
              borderRadius: '10px',
              padding: '10px',
              backgroundColor: '#f8f9fa',
              marginBottom: '10px',
              height: '600px', // 限制聊天框高度
              overflowY: 'scroll', // 使聊天框可滚动
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
              <Avatar
                size={128
                }
                src={chatImage === 1
                  ? require('./robot_1.png')
                  : chatImage === 2
                    ? require('./robot_2.png')
                    : chatImage === 3
                      ? require('./robot_3.png')
                      : require('./robot_4.png')
                }
                style={{ marginBottom: '10px' }}
              />
              <Card style={{
                width: 1175,
                marginLeft: '50px'
              }}> <p>{<span style={{ fontSize: '20px' }}>{chatImage === 1
                ? robotDave
                : chatImage === 2
                  ? robotChad
                  : chatImage === 3
                    ? robotAlice
                    : robotBob}</span>}</p></Card>   </div>
            <Card
              style={{
                width: 1300,
                marginLeft: '50px'
              }}
            >

              <p>{<span style={{ fontSize: '20px' }}>这是我们的{(chatImage === 1 || chatImage === 2) ? sceneHint : sceneHint_2}</span>}</p>
              <p>{<span style={{ fontSize: '20px' }}>提问模板：{chatImage === 1
                ? agentModel_1
                : chatImage === 2
                  ? agentModel_2
                  : chatImage === 3
                    ? agentModel_3
                    : agentModel_4}</span>}</p>
            </Card>
            <List
              className="chat-content"
              dataSource={messages}
              renderItem={(message) => (
<List.Item className={message.sender === 'user' ? 'you' : 'chatgpt'}>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <Avatar
      size={64}
      src={
        message.sender === 'user'
          ? require('./user.jpg') // 用户的头像
          : chatImage === 1
            ? require('./robot_1.png')
            : chatImage === 2
              ? require('./robot_2.png')
              : chatImage === 3
                ? require('./robot_3.png')
                : require('./robot_4.png')
      }
      style={{ marginRight: '10px', flexShrink: 0 }} // 添加 flexShrink: 0 防止头像被挤压
    />

    <div style={{ flex: 1 }}> {/* 让文本内容占据剩余空间 */}
      <div style={{ fontWeight: 'bold', fontSize: '20px' }}>{message.sender === 'user' ? 'You' : message.sender}</div>
      <div style={{ fontSize: '26px', marginLeft: '10px' }}>{message.text}</div>
    </div>
  </div>
</List.Item>
              )}
            />
          </div>
          <div className="input-container" style={{ display: 'flex', alignItems: 'center', borderRadius: '20px', padding: '10px' }}>
            <TextArea
              allowClear
              autoSize
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="输入你的消息..."
              onPressEnter={handleKeyPress}
            />
            <Button
              type="primary"
              onClick={handleSend}
              style={{ borderRadius: '20px', marginLeft: '10px' }}
            >
              发送
            </Button>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LargeModel;