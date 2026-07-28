import config
import json
from tools_config import tools
from keyword_data import fetch_data


def message_classify(messages):
    content=config.client.chat.completions.create(
        model="deepseek-v4-flash",
        messages=messages,
        tools=tools
    )
    return content

with open('11.markdown','r',encoding='utf-8') as f:
    system_content=f.read()

mes=[
    {
        'role':'system',
        'content':system_content
    }
]
while True:
    user_input=input('请输入内容,输入0 退出：')
    if user_input =='0':
        print('会话结束')
        break
    else:
        mes.append(
            {
                'role':'user',
                'content':user_input
            }
        )
    response=message_classify(mes)
    if response.choices[0].finish_reason =='tool_calls': #返回中结束推理结果为调取参数则走判断
        tc=response.choices[0].message.tool_calls[0] #存储工具传参
        args=json.loads(tc.function.arguments) #解析参数
        if tc.function.name == 'keyword_data':
            mes.append(response.choices[0].message)
            app_id=args.get('app_id')
            results=fetch_data(int(app_id))
            mes.append(
                {
                    'role':'tool',
                    'tool_call_id':tc.id,
                    'content':results
                }
            )
            response=message_classify(mes)
    # print(json.dumps(response.model_dump(),indent=2,ensure_ascii=False))
    reply_content=response.choices[0].message.content
    print(f'---AI回复---\n{reply_content}\n---回复结束---')
    mes.append(
        {
            'role':'assistant',
            'content':reply_content
        }
    )
