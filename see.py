# -*- coding:utf-8 -*-

from selenium.webdriver.common.by import By
from selenium import webdriver
import pandas as pd
import random
from lxml import etree
import json
import requests
import time
url = 'https://www.liepin.com/zhaopin/?city=010&dq=010&pubTime=&currentPage=0&pageSize=40&key=web&workYearCode=0&compId=&compName=&compTag=&industry=&salary=&jobKind=&compScale=&compKind=&compStage=&eduLevel=&otherCity=&scene=input&suggestId='
# import input
# import pymongo

dict_list = []
position_list = []
location_list = []
money_list = []
company_list = []
company_welfare_list = []
management_list = []
exp_list = []
detailed_url_list = []
browser = webdriver.Edge()
page = 11
name = ['3~7岁儿童气质量表 ',
'儿童焦虑性情绪障碍筛查表(SCARED) ',
'儿童抑郁障碍自评量表',
'社会交往问卷-Lifttime(SCQ)',
'儿童饮食行为量表(CEBQ) ',
'儿童困难问卷(QCD)',
'阿斯伯格综合征儿童筛查量表',
'高功能自闭症儿童自测表',
'婴儿过敏风险评估表（最终版）',
'瑞文智力测验',
'SCL90自评量表',
'PHQ-9自评量表 ',
'Conners评定量表',
'改良婴幼儿孤独症量表中文修订（M-CHAT）',
'学龄前儿童50项智能筛查量表',
'婴儿过敏风险指数测试',
'5-11个月婴儿气质量表 ',
'1~3岁幼儿气质量表',
'1-4个月婴儿气质量表',
'婴幼儿孤独症量表（CHAT-23）',
' GAD-7',
'婴幼儿孤独症筛查量表（CHAT）',
'婴儿-初中学生社会生活能力量表',
'CBCL儿童行为量表',
'中国儿童注意力水平测评量表',
'克氏孤独症行为量表',
'0~1岁家庭养育环境评估量表',
'1~3岁幼儿家庭养育环境评估量表',
'功能缺陷量表(WFIRS-P)',
'沟通和象征性行为发展量表婴幼儿问卷',
'父母育儿技能评估表',
'SNAP-IV',
'长处与困难问卷(SDQ)',
	'多发性抽动症综合量表(TSGS)']
url = 'https://chatgpt.ddiu.me/'
print(url, 'url 第一页')
browser.get(url)
time.sleep(1)

browser.find_element(By.TAG_NAME, 'input').send_keys(name[0]+'参考文献')
ant = browser.find_element(
    By.TAG_NAME, 'button')
ant.click()
click()
time.sleep(1)


print(names, 'names')
time.sleep(1)

