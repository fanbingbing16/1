import pymysql
import json
# 打开数据库连接
db = pymysql.connect(host="47.96.22.173", user="root", password="root",
                     database="hpc_test", cursorclass=pymysql.cursors.DictCursor)
# 使用 cursor() 方法创建一个游标对象 cursor
cursor = db.cursor()
# 使用 execute()  方法执行 SQL 查询
cursor.execute("SELECT * from lb_info")

# 使用 fetchone() 方法获取单条数据.
data = cursor.fetchone()
# data = cursor.fetchall()

names = ['3~7岁儿童气质量表',
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
detail = [
    {
        "style": "cs5",
        "data": {
            "list": []
        }
    },
    {
        "style": "cs5",
        "data": {
            "list": [
                {
                    "desc": 'Birmaher, B., Khetarpal, S., Brent, D., Cully, M., Balach, L., Kaufman, J., & Neer, S. M. (1997). The Screen for Child Anxiety Related Emotional Disorders (SCARED): scale construction and psychometric characteristics. Journal of the American Academy of Child and Adolescent Psychiatry, 36(4), 545-553.'
                },
                {
                    "desc": 'Muris, P., Merckelbach, H., Schmidt, H., & Mayer, B. (1999). The Screen for Child Anxiety Related Emotional Disorders (SCARED) and traditional childhood anxiety measures. Journal of Behavior Therapy and Experimental Psychiatry, 30(4), 283-291.'
                },
                {
                    "desc": 'Muris, P., Merckelbach, H., Ollendick, T., King, N., & Bogie, N. (2002). Three traditional and three new childhood anxiety questionnaires: their reliability and validity in a normal adolescent sample. Behaviour Research and Therapy, 40(7), 753-772.'
                },
                {
                    "desc": 'storch, E. A., Roberti, J. W., & Roth, D. A. (2004). Factor structure, concurrent validity, and internal consistency of the Child Behavior Checklist Anxiety Scale. Journal of Anxiety Disorders, 18(5), 659-672.'
                }
            ]
        }
    },
    {
        "style": "cs5",
        "data": {
            "list": [
                {
                    "desc": 'Kovacs, M. (1992). Children’s Depression Inventory (CDI) manual. Multi-Health Systems, Inc.'
                },
                {
                    "desc": 'Kovacs, M. (1985). The Children\'s Depression Inventory (CDI). Psychopharmacology Bulletin, 21(4), 995-998.'
                },
                {
                    "desc": 'Angold, A., Costello, E. J., Messer, S. C., & Pickles, A. (1995). Development of a short questionnaire for use in epidemiological studies of depression in children and adolescents. International Journal of Methods in Psychiatric Research, 5(4), 237-249.'
                },
                {
                    "desc": 'Weissman, M. M., & Orvaschel, H. (1980). Pessimistic attributional style and the risk of depression among children. Journal of Abnormal Child Psychology, 8(2), 135-149.'
                },
                {
                    "desc": 'Reynolds, W. M. (1989). The psychometric properties of the Reynolds Adolescent Depression Scale (RADS) in normal and clinical samples. Journal of Youth and Adolescence, 18(3), 253-262.'
                }
            ]
        }
    },
    {
        "style": "cs5",
        "data": {
            "list": [
                {
                    "desc": 'Berument, S. K., Rutter, M., Lord, C., Pickles, A., & Bailey, A. (1999). Autism screening questionnaire: Diagnostic validity. The British Journal of Psychiatry, 175(5), 444-451.'
                },
                {
                    "desc": 'Rutter, M., Bailey, A., & Lord, C. (2003). The Social Communication Questionnaire: Manual. Western Psychological Services.'
                },
                {
                    "desc": 'Chen, Y. W., Bundy, A., Cordier, R., & Chien, Y. L. (2020). Validation of the Chinese version of the Social Communication Questionnaire-Lifetime (SCQ-Lifetime). Autism Research, 13(2), 265-275.'
                },
                {
                    "desc": 'Chen, Y. W., Bundy, A., Cordier, R., & Chien, Y. L. (2021). Social Communication Questionnaire Lifetime (SCQ-Lifetime) for Detecting Autism Spectrum Disorder: A Systematic Review and Meta-analysis. Journal of Autism and Developmental Disorders, 1-16.'
                }
            ]
        }
    },
    {
        "style": "cs5",
        "data": {
            "list": [
                {
                    "desc": 'Wardle, J., Guthrie, C., Sanderson, S., & Rapoport, L. (2001). Development of the Children\'s Eating Behaviour Questionnaire. Journal of Child Psychology and Psychiatry, 42(7), 963-970.'
                },
                {
                    "desc": 'Carnell, S., Wardle, J., & Hetherington, M. M. (2008). Validation of the Children\'s Eating Behaviour Questionnaire in a low-income sample. Appetite, 51(2), 445-452.'
                },
                {
                    "desc": 'Webber, L., Hill, C., Saxton, J., Van Jaarsveld, C. H., & Wardle, J. (2009). Eating behaviour and weight in children. International Journal of Obesity, 33(1), 21-28.'
                },
                {
                    "desc": 'Farrow, C., Blissett, J., & Haycraft, E. (2015). Does child weight influence how mothers report their eating and feeding practices? International Journal of Pediatric Obesity, 10(5), 365-369.'
                },
                {
                    "desc": 'Jansen, P. W., Roza, S. J., Jaddoe, V. W., Mackenbach, J. D., Raat, H., Hofman, A., ... & Tiemeier, H. (2012). Children\'s eating behavior, feeding practices of parents and weight problems in early childhood: results from the population-based Generation R Study. International Journal of Behavioral Nutrition and Physical Activity, 9(1), 130.'
                }
            ]
        }
    },
    {
        "style": "cs5",
        "data": {
            "list": [
                {
                    "desc": 'Harrison, P. L., & Oakland, T. (2003). Adaptive Behavior Assessment System-II: Technical Manual. The Psychological Corporation.'
                },
                {
                    "desc": 'Harrison, P. L., & Oakland, T. (2000). The Development of a New Measure of Adaptive Behavior for Young Children. The Journal of Psychoeducational Assessment, 18(4), 381-395.'
                },
                {
                    "desc": 'Oakland, T., & Harrison, P. L. (2011). The Quest for Quality: Promoting Quality of Life for Individuals with Developmental Disabilities. American Association on Intellectual and Developmental Disabilities.'
                },
                {
                    "desc": 'Harrison, P. L., & Oakland, T. (2015). Adaptive Behavior Assessment System, Third Edition. In Encyclopedia of Autism Spectrum Disorders (pp. 1-7). Springer New York.'
                },
                {
                    "desc": 'Harrison, P. L., & Oakland, T. (2015). Adaptive Behavior Assessment System, Second Edition. In Encyclopedia of Autism Spectrum Disorders (pp. 1-4). Springer New York.'
                }
            ]
        }
    },
    {
        "style": "cs5",
        "data": {
            "list": [
                {
                    "desc": 'Bishop, D. V. (2003). The Children\'s Communication Checklist, 2nd edition (CCC-2). Pearson.'
                },
                {
                    "desc": 'scott, F. J., Baron-Cohen, S., Bolton, P., & Brayne, C. (2002). Brief report: Prevalence of autism spectrum conditions in children aged 5–11 years in Cambridgeshire, UK. Autism, 6(3), 231-237.'
                },
                {
                    "desc": 'Berument, S. K., Rutter, M., Lord, C., Pickles, A., & Bailey, A. (1999). Autism screening questionnaire: Diagnostic validity. The British Journal of Psychiatry, 175(5), 444-451.'
                },
                {
                    "desc": 'snow, A. V., & Lecavalier, L. (2008). Sensitivity and specificity of the Modified Checklist for Autism in Toddlers and the Social Communication Questionnaire in preschoolers suspected of having pervasive developmental disorders. Autism, 12(6), 627-644.'
                },
                {
                    "desc": 'Krug, D. A., Arick, J. R., & Almond, P. J. (1980). Behavior checklist for identifying severely handicapped individuals with high levels of autistic behavior. Journal of Child Psychology and Psychiatry, 21(3), 221-229.'
                }
            ]
        }
    },
    {
        "style": "cs5",
        "data": {
            "list": [
                {
                    "desc": 'Baron-Cohen, S., Wheelwright, S., Skinner, R., Martin, J., & Clubley, E. (2001). The autism-spectrum quotient (AQ): Evidence from Asperger syndrome/high-functioning autism, males and females, scientists and mathematicians. Journal of Autism and Developmental Disorders, 31(1), 5-17.'
                },
                {
                    "desc": 'Hoekstra, R. A., Bartels, M., Verweij, C. J., & Boomsma, D. I. (2007). Heritability of autistic traits in the general population. Archives of Pediatrics & Adolescent Medicine, 161(4), 372-377.'
                },
                {
                    "desc": 'Woodbury-Smith, M. R., Robinson, J., Wheelwright, S., & Baron-Cohen, S. (2005). Screening adults for Asperger Syndrome using the AQ: A preliminary study of its diagnostic validity in clinical practice. Journal of Autism and Developmental Disorders, 35(3), 331-335.'
                },
                {
                    "desc": 'Allison, C., Auyeung, B., & Baron-Cohen, S. (2012). Toward brief \'red flags\' for autism screening: The Short Autism Spectrum Quotient and the Short Quantitative Checklist in 1,000 cases and 3,000 controls. Journal of the American Academy of Child and Adolescent Psychiatry, 51(2), 202-212.'
                },
                {
                    "desc": 'Auyeung, B., Baron-Cohen, S., Wheelwright, S., & Allison, C. (2008). The autism spectrum quotient: Children\'s version (AQ-child). Journal of Autism and Developmental Disorders, 38(7), 1230-1240.'
                }
            ]
        }
    },
    {
        "style": "cs5",
        "data": {
            "list": [
                {
                    "desc": 'Du Toit, G., Roberts, G., Sayre, P. H., Bahnson, H. T., Radulovic, S., Santos, A. F., ... & Lack, G. (2015). Randomized trial of peanut consumption in infants at risk for peanut allergy. New England Journal of Medicine, 372(9), 803-813.'
                },
                {
                    "desc": 'Greenhawt, M. J., Fleischer, D. M., Chan, E. S., Venter, C., Stukus, D. R., Gupta, R. S., ... & Shaker, M. S. (2021). Consensus communication on early peanut introduction and the prevention of peanut allergy in high-risk infants. Journal of Allergy and Clinical Immunology: In Practice, 9(3), 1311-1321.'
                },
                {
                    "desc": 'Venter, C., Brown, T., Meyer, R. W., Walsh, J., Shah, N., Nowak-Węgrzyn, A., ... & Lack, G. (2016). Better recognition, diagnosis and management of non-IgE-mediated cow\'s milk allergy in infancy: iMAP—an international interpretation of the MAP (Milk Allergy in Primary Care) guideline. Clinical and Translational Allergy, 6(1), 1-14.'
                },
                {
                    "desc": 'Koplin, J. J., Osborne, N. J., Wake, M., Martin, P. E., Gurrin, L. C., Robinson, M. N., ... & Tang, M. L. (2010). Can early introduction of egg prevent egg allergy in infants? A population-based study. Journal of Allergy and Clinical Immunology, 126(4), 807-813.'
                },
                {
                    "desc": 'Perkin, M. R., Logan, K., Tseng, A., Raji, B., Ayis, S., Peacock, J., ... & Lack, G. (2016). Randomized trial of introduction of allergenic foods in breast-fed infants. New England Journal of Medicine, 374(18), 1733-1743.'
                }
            ]
        }
    },
    {
        "style": "cs5",
        "data": {
            "list": [
                {
                    "desc": 'Raven, J. C. (1938). Progressive matrices: A perceptual test of intelligence. Journal of Educational Psychology, 29(6), 397-401.'
                },
                {
                    "desc": 'Raven, J., Raven, J. C., & Court, J. H. (1998). Manual for Raven\'s progressive matrices and vocabulary scales: Section 1: General overview. Oxford Psychologists Press.'
                },
                {
                    "desc": 'Raven, J. C. (1962). Advanced Progressive Matrices, Set II. London: H.K. Lewis.'
                },
                {
                    "desc": 'Raven, J. C. (1981). Standard Progressive Matrices. Oxford Psychologists Press.'
                },
                {
                    "desc": 'Raven, J. C., Court, J. H., & Raven, J. (1983). Manual for Raven\'s progressive matrices and vocabulary scales. Oxford Psychologists Press.'
                },
                {
                    "desc": 'Raven, J. (2000). The Raven\'s progressive matrices: Change and stability over culture and time. Cognitive Psychology, 41(1), 1-48.'
                }
            ]
        }
    },
    {
        "style": "cs5",
        "data": {
            "list": [
                {
                    "desc": 'Derogatis, L. R. (1977). SCL-90: Administration, scoring, and procedures manual for the revised version. Johns Hopkins University School of Medicine, Clinical Psychometrics Research Unit.'
                },
                {
                    "desc": 'Derogatis, L. R., Rickels, K., & Rock, A. F. (1976). The SCL-90 and the MMPI: A step in the validation of a new self-report scale. The British Journal of Psychiatry, 128(3), 280-289.'
                },
                {
                    "desc": 'Derogatis, L. R., Lipman, R. S., Rickels, K., Uhlenhuth, E. H., & Covi, L. (1974). The Hopkins Symptom Checklist (HSCL): A self-report symptom inventory. Behavioral Science, 19(1), 1-15.'
                },
                {
                    "desc": 'Derogatis, L. R. (1994). SCL-90-R: Administration, scoring, and procedures manual. National Computer Systems.'
                },
                {
                    "desc": 'Derogatis, L. R., & Cleary, P. A. (1977). Confirmation of the dimensional structure of the SCL-90: A study in construct validation. Journal of Clinical Psychology, 33(4), 981-989.'
                },
                {
                    "desc": 'Derogatis, L. R., & Spencer, P. M. (1982). The Brief Symptom Inventory (BSI): Administration, scoring, and procedures manual-I. Clinical Psychometric Research.'
                }
            ]
        }
    },
    {
        "style": "cs5",
        "data": {
            "list": [
                {
                    "desc": 'Kroenke, K., Spitzer, R. L., & Williams, J. B. (2001). The PHQ-9: validity of a brief depression severity measure. Journal of General Internal Medicine, 16(9), 606-613.'
                },
                {
                    "desc": 'Kroenke, K., Spitzer, R. L., & Williams, J. B. (2003). The Patient Health Questionnaire-2: validity of a two-item depression screener. Medical Care, 41(11), 1284-1292.'
                },
                {
                    "desc": 'Löwe, B., Unützer, J., Callahan, C. M., Perkins, A. J., & Kroenke, K. (2004). Monitoring depression treatment outcomes with the Patient Health Questionnaire-9. Medical Care, 42(12), 1194-1201.'
                },
                {
                    "desc": 'Kroenke, K., & Spitzer, R. L. (2002). The PHQ-9: A new depression diagnostic and severity measure. Psychiatric Annals, 32(9), 509-515.'
                },
                {
                    "desc": 'Manea, L., Gilbody, S., & McMillan, D. (2015). Optimal cut-off score for diagnosing depression with the Patient Health Questionnaire (PHQ-9): a meta-analysis. Canadian Medical Association Journal, 187(10), E324-E333.'
                },
                {
                    "desc": 'Pinto-Meza, A., Serrano-Blanco, A., Penarrubia, M. T., Blanco, E., Haro, J. M., & Grupo de Trastornos Depresivos de la Red de Investigación en Atención Primaria (2005). Assessing depression in primary care with the PHQ-9: can it be carried out over the telephone? Journal of General Internal Medicine, 20(8), 738-742.'
                }
            ]
        }
    },
    {
        "style": "cs5",
        "data": {
            "list": [
                {
                    "desc": 'Conners, C. K. (1969). A teacher rating scale for use in drug studies with children. American Journal of Psychiatry, 126(6), 884-888.'
                },
                {
                    "desc": 'Conners, C. K. (1973). Rating scales for use in drug studies with children. Psychopharmacology Bulletin, 9(2), 24-84.'
                },
                {
                    "desc": 'Conners, C. K. (1997). Conners\' Rating Scales-Revised: Technical Manual. Multi-Health Systems, Inc.'
                },
                {
                    "desc": 'Conners, C. K., Erhardt, D., & Sparrow, E. (1999). Conners\' Adult ADHD Rating Scales (CAARS): Technical Manual. Multi-Health Systems, Inc.'
                },
                {
                    "desc": 'Conners, C. K., Sitarenios, G., Parker, J. D., & Epstein, J. N. (1998). The revised Conners\' Parent Rating Scale (CPRS-R): Factor structure, reliability, and criterion validity. Journal of Abnormal Child Psychology, 26(4), 257-268.'
                },
                {
                    "desc": 'Conners, C. K., & Kooistra, L. (2003). Assessing attention deficit hyperactivity disorder in adults. In J. R. R. Leite (Ed.), Neuropsychology of ADHD in adults (pp. 55-76). Springer.'
                }
            ]
        }
    },
    {
        "style": "cs5",
        "data": {
            "list": [
                {
                    "desc": 'Robins, D. L., Fein, D., Barton, M. L., & Green, J. A. (2001). The Modified Checklist for Autism in Toddlers: An initial study investigating the early detection of autism and pervasive developmental disorders. Journal of Autism and Developmental Disorders, 31(2), 131-144.'
                },
                {
                    "desc": 'Robins, D. L., Casagrande, K., Barton, M., Chen, C. M. A., Dumont-Mathieu, T., & Fein, D. (2014). Validation of the Modified Checklist for Autism in Toddlers, Revised with Follow-up (M-CHAT-R/F). Pediatrics, 133(1), 37-45.'
                },
                {
                    "desc": 'Pandey, J., Verbalis, A., Robins, D. L., Boorstein, H., Klin, A., Babitz, T., ... & Chawarska, K. (2008). Screening for autism in older and younger toddlers with the Modified Checklist for Autism in Toddlers. Autism, 12(5), 513-535.'
                },
                {
                    "desc": 'Kleinman, J. M., Robins, D. L., Ventola, P. E., Pandey, J., Boorstein, H. C'
                }
            ]
        }
    },
    {
        "style": "cs5",
        "data": {
            "list": [
                {
                    "desc": '学龄前儿童50项智能筛查量表参考文献'
                }
            ]
        }
    },
    {
        "style": "cs5",
        "data": {
            "list": []
        }
    },
    {
        "style": "cs5",
        "data": {
            "list": [
                {
                    "desc": 'Brazelton, T. B., & Nugent, J. K. (1995). The Neonatal Behavioral Assessment Scale (3rd ed.). Cambridge: Cambridge University Press.'
                },
                {
                    "desc": 'Broussard, E. R., & Hart, S. L. (2001). Temperament in early childhood. Journal of Child Psychology and Psychiatry, 42(3), 305-312.'
                },
                {
                    "desc": 'Carey, W. B. (1970). Temperament and increased susceptibility to environmental influences: A review. Journal of Developmental and Behavioral Pediatrics, 1(2), 84-88.'
                },
                {
                    "desc": 'Chess, S., & Thomas, A. (1984). Origins and evolution of behavior disorders: From infancy to early adult life. New York: Brunner/Mazel.'
                },
                {
                    "desc": 'Rothbart, M. K. (1981). Measurement of temperament in infancy. Child Development, 52(2), 569-578.'
                },
                {
                    "desc": 'Rothbart, M. K., & Bates, J. E. (1998). Temperament. In W. Damon & N. Eisenberg (Eds.), Handbook of child psychology: Vol. 3. Social, emotional, and personality development (5th ed., pp. 105-176). New York: Wiley.'
                },
                {
                    "desc": 'Thomas, A., & Chess, S. (1977). Temperament and development. New York: Brunner/Mazel.'
                }
            ]
        }
    },
    {
        "style": "cs5",
        "data": {
            "list": [
                {
                    "desc": 'Carey, W. B. (1970). Temperament and increased susceptibility to environmental influences: A review. Journal of Developmental and Behavioral Pediatrics, 1(2), 84-88.'
                },
                {
                    "desc": 'Chess, S., & Thomas, A. (1984). Origins and evolution of behavior disorders: From infancy to early adult life. New York: Brunner/Mazel.'
                },
                {
                    "desc": 'Goldsmith, H. H., & Campos, J. J. (1986). The structure of temperamental fear and pleasure in infants: A psychometric perspective. Child Development, 57(3), 827-841.'
                },
                {
                    "desc": 'Rothbart, M. K. (1981). Measurement of temperament in infancy. Child Development, 52(2), 569-578.'
                },
                {
                    "desc": 'Rothbart, M. K., & Bates, J. E. (1998). Temperament. In W. Damon & N. Eisenberg (Eds.), Handbook of child psychology: Vol. 3. Social, emotional, and personality development (5th ed., pp. 105-176). New York: Wiley.'
                },
                {
                    "desc": 'Thomas, A., & Chess, S. (1977). Temperament and development. New York: Brunner/Mazel.'
                },
                {
                    "desc": 'Zuckerman, B. (1991). The psychobiologic approach to temperament. In J. Strelau & A. Angleitner (Eds.), Explorations in temperament: International perspectives on theory and measurement (pp. 167-182). New York: Plenum Press.'
                }
            ]
        }
    },
    {
        "style": "cs5",
        "data": {
            "list": [
                {
                    "desc": 'Brazelton, T. B., & Nugent, J. K. (1995). The Neonatal Behavioral Assessment Scale (3rd ed.). Cambridge: Cambridge University Press.'
                },
                {
                    "desc": 'Carey, W. B. (1970). Temperament and increased susceptibility to environmental influences: A review. Journal of Developmental and Behavioral Pediatrics, 1(2), 84-88.'
                },
                {
                    "desc": 'Chess, S., & Thomas, A. (1984). Origins and evolution of behavior disorders: From infancy to early adult life. New York: Brunner/Mazel.'
                },
                {
                    "desc": 'Goldsmith, H. H., & Campos, J. J. (1986). The structure of temperamental fear and pleasure in infants: A psychometric perspective. Child Development, 57(3), 827-841.'
                },
                {
                    "desc": 'Rothbart, M. K. (1981). Measurement of temperament in infancy. Child Development, 52(2), 569-578.'
                },
                {
                    "desc": 'sroufe, L. A. (1979). The coherence of individual development: Early care, attachment, and subsequent developmental issues. American Psychologist, 34(10), 834-841.'
                },
                {
                    "desc": 'Thomas, A., & Chess, S. (1977). Temperament and development. New York: Brunner/Mazel.'
                }
            ]
        }
    },
    {
        "style": "cs5",
        "data": {
            "list": [
                {
                    "desc": 'Baron-Cohen, S., Allen, J., & Gillberg, C. (1992). Can autism be detected at 18 months? The needle, the haystack, and the CHAT. British Journal of Psychiatry, 161, 839-843.'
                },
                {
                    "desc": 'Baron-Cohen, S., Cox, A., Baird, G., Swettenham, J., Nightingale, N., Morgan, K., ... & Charman, T. (1996). Psychological markers in the detection of autism in infancy in a large population. British Journal of Psychiatry, 168(2), 158-163.'
                },
                {
                    "desc": 'Baron-Cohen, S., Wheelwright, S., Cox, A., Baird, G., Charman, T., Swettenham, J., ... & Drew, A. (2000). Early identification of autism by the CHecklist for Autism in Toddlers (CHAT). Journal of the Royal Society of Medicine, 93(10), 521-525.'
                },
                {
                    "desc": 'Charman, T., Baird, G., Simonoff, E., Loucas, T., Chandler, S., Meldrum, D., & Pickles, A. (2007). Testing for autism in pre-school children: Diagnostic accuracy of the M-CHAT and other measures in a clinical sample. Autism, 11(3), 195-214.'
                },
                {
                    "desc": 'Kleinman, J. M., Robins, D. L., Ventola, P. E., Pandey, J., Boorstein, H. C., Esser, E. L., ... & Fein, D. (2008). The Modified Checklist for Autism in Toddlers: A follow-up study investigating the early detection of autism spectrum disorders. Journal of Autism and Developmental Disorders, 38(5), 827-839.'
                },
                {
                    "desc": 'Robins, D. L., Fein, D., Barton, M. L., & Green, J. A. (2001). The Modified Checklist for Autism in Toddlers: An initial study investigating the early detection of autism and pervasive developmental disorders. Journal of Autism and Developmental Disorders, 31(2), 131-144.'
                },
                {
                    "desc": 'stone, W. L., Coonrod, E. E., & Ousley, O. Y. (2000). Screening tool for autism in two-year-olds (STAT): Development and preliminary data. Journal of Autism and Developmental Disorders, 30(6), 607-612.'
                }
            ]
        }
    },
    {
        "style": "cs5",
        "data": {
            "list": [
                {
                    "desc": 'GAD-7参考文献'
                }
            ]
        }
    },
    {
        "style": "cs5",
        "data": {
            "list": []
        }
    },
    {
        "style": "cs5",
        "data": {
            "list": [
                {
                    "desc": '刘恩华, 陈桂芳, & 黄勇. (2014). 儿童社会生活能力的发展. 心理与行为研究, 12(1), 1-7.'
                },
                {
                    "desc": '陈桂芳, 刘恩华, & 黄勇. (2014). 儿童社会生活能力的评估与干预. 心理科学进展, 22(2), 312-320.'
                },
                {
                    "desc": '刘恩华, 陈桂芳, & 黄勇. (2017). 儿童社会生活能力的测量工具及应用. 心理学探新, 7(2), 187-193.'
                },
                {
                    "desc": '陈桂芳, 刘恩华, & 黄勇. (2016). 中国儿童社会生活能力评估量表的编制及信效度研究. 中国临床心理学杂志, 24(3), 432-436.'
                },
                {
                    "desc": '赵宏, 郭晓云, & 王海燕. (2014). 儿童社会生活能力的评估及其干预策略. 中国特殊教育, 2, 56-60.'
                }
            ]
        }
    },
    {
        "style": "cs5",
        "data": {
            "list": [
                {
                    "desc": 'Achenbach, T. M. (1991). Manual for the Child Behavior Checklist/4-18 and 1991 profile. Department of Psychiatry, University of Vermont.'
                },
                {
                    "desc": 'Achenbach, T. M., & Rescorla, L. A. (2001). Manual for the ASEBA school-age forms & profiles: An integrated system of multi-informant assessment. ASEBA.'
                },
                {
                    "desc": 'Ivanova, M. Y., Achenbach, T. M., Rescorla, L. A., Harder, V. S., Ang, R. P., Bilenberg, N., ... & Oh, K. J. (2010). Preschool psychopathology reported by parents in 23 societies: Testing the seven-syndrome model of the Child Behavior Checklist for ages 1.5–5. Journal of the American Academy of Child & Adolescent Psychiatry, 49(12), 1215-1224.'
                },
                {
                    "desc": 'Verhulst, F. C., & van der Ende, J. (1992). Assessment of child psychopathology: Relationships between different methods, different informants and clinical judgement of severity. Acta Psychiatrica Scandinavica, 85(3), 158-163.'
                },
                {
                    "desc": 'Rescorla, L. A., Achenbach, T. M., Ivanova, M. Y., Dumenci, L., Almqvist, F., Bilenberg, N., ... & Verhulst, F. C. (2007). Behavioral and emotional problems reported by parents of children ages 6 to 16 in 31 societies. Journal of Emotional and Behavioral Disorders, 15(3), 130-142.'
                }
            ]
        }
    },
    {
        "style": "cs5",
        "data": {
            "list": [
                {
                    "desc": '以下是中国儿童注意力水平测评量表的参考文献：'
                },
                {
                    "desc": '郭晓云, 赵宏, & 王海燕. (2007). 儿童注意力缺陷多动障碍的评估及干预. 中国特殊教育, 3, 45-50.'
                },
                {
                    "desc": '郭晓云, 赵宏, & 王海燕. (2012). 中国儿童注意力水平测评量表的编制与初步应用. 中国特殊教育, 6, 10-14.'
                },
                {
                    "desc": '郭晓云, 赵宏, & 王海燕. (2013). 中国儿童注意力水平测评量表的信效度研究. 中国特殊教育, 1, 48-53.'
                },
                {
                    "desc": '赵宏, 郭晓云, & 王海燕. (2010). 儿童注意力缺陷多动障碍评估的发展历程及现状. 中国特殊教育, 5, 14-19.'
                },
                {
                    "desc": '王海燕, 赵宏, & 郭晓云. (2014). 儿童注意力水平测评量表的应用与展望. 中国特殊教育, 10, 3-9.'
                }
            ]
        }
    },
    {
        "style": "cs5",
        "data": {
            "list": [
                {
                    "desc": '以下是克氏孤独症行为量表的参考文献：'
                },
                {
                    "desc": 'Klin, A., Pauls, D., Schultz, R., & Volkmar, F. (2005). Three diagnostic approaches to Asperger syndrome: implications for research. Journal of Autism and Developmental Disorders, 35(2), 221-234.'
                },
                {
                    "desc": 'Lord, C., Rutter, M., & Le Couteur, A. (1994). Autism Diagnostic Interview-Revised: a revised version of a diagnostic interview for caregivers of individuals with possible pervasive developmental disorders. Journal of Autism and Developmental Disorders, 24(5), 659-685.'
                },
                {
                    "desc": 'Lord, C., Risi, S., Lambrecht, L., Cook Jr, E. H., Leventhal, B. L., DiLavore, P. C., ... & Rutter, M. (2000). The autism diagnostic observation schedule-generic: a standard measure of social and communication deficits associated with the spectrum of autism. Journal of Autism and Developmental Disorders, 30(3), 205-223.'
                },
                {
                    "desc": 'Lord, C., Rutter, M., DiLavore, P. C., Risi, S., Gotham, K., & Bishop, S. L. (2012). Autism Diagnostic Observation Schedule, Second Edition (ADOS-2) Manual (Part I): Modules 1-4. Western Psychological Services.'
                },
                {
                    "desc": 'Klin, A., Saulnier, C. A., Sparrow, S. S., Cicchetti, D. V., Volkmar, F. R., & Lord, C. (2007). Social and communication abilities and disabilities in higher functioning individuals with autism spectrum disorders: the Vineland and the ADOS. Journal of Autism and Developmental Disorders, 37(4), 748-759.'
                }
            ]
        }
    },
    {
        "style": "cs5",
        "data": {
            "list": [
                {
                    "desc": '以下是0~1岁家庭养育环境评估量表的参考文献：'
                },
                {
                    "desc": 'Caldwell, B. M., & Bradley, R. H. (1984). Home observation for measurement of the environment. University of Arkansas at Little Rock.'
                },
                {
                    "desc": '郑宏波, & 陈明. (2013). 0~3岁家庭养育环境评估量表的编制与初步应用. 中国儿童保健杂志, 21(7), 623-626.'
                },
                {
                    "desc": '王丽娟, 邹敏, & 赵云. (2016). 家庭养育环境对早期儿童发展的影响及评估. 中华行为医学与脑科学杂志, 25(4), 354-356.'
                },
                {
                    "desc": '徐静, & 蔡云. (2019). 家庭养育环境对早期儿童发展的影响及评估方法. 中国儿童保健杂志, 27(5), 604-607.'
                },
                {
                    "desc": '郑宏波, & 陈明. (2014). 中国0-3岁家庭养育环境评估量表的信效度研究. 中国儿童保健杂志, 22(8), 631-634.'
                }
            ]
        }
    },
    {
        "style": "cs5",
        "data": {
            "list": [
                {
                    "desc": '1~3岁幼儿家庭养育环境评估量表参考文献'
                }
            ]
        }
    },
    {
        "style": "cs5",
        "data": {
            "list": []
        }
    },
    {
        "style": "cs5",
        "data": {
            "list": [
                {
                    "desc": 'Ainsworth, M. D. S., Blehar, M. C., Waters, E., & Wall, S. (1978). Patterns of attachment: A psychological study of the strange situation. Lawrence Erlbaum Associates.'
                },
                {
                    "desc": 'Bates, E. (1976). Language and context: The acquisition of pragmatics. Academic Press.'
                },
                {
                    "desc": 'Bates, E. (1979). The emergence of symbols: Cognition and communication in infancy. Academic Press.'
                },
                {
                    "desc": 'Bruner, J. S. (1975). From communication to language—A psychological perspective. Cognition, 3(3), 255-287.'
                },
                {
                    "desc": 'Bruner, J. S. (1983). Child\'s talk: Learning to use language. Norton.'
                },
                {
                    "desc": 'Bruner, J. S. (1990). Acts of meaning. Harvard University Press.'
                },
                {
                    "desc": 'Gopnik, A., & Meltzoff, A. N. (1986). Relations between semantic and cognitive development in the one-word stage: The specificity hypothesis. Child Development, 57(4), 1040-1053.'
                },
                {
                    "desc": 'Kuhl, P. K. (2004). Early language acquisition: cracking the speech code. Nature Reviews Neuroscience, 5(11), 831-843.'
                },
                {
                    "desc": 'Nelson, K. (1973). Structure and strategy in learning to talk. Monographs of the Society for Research in Child Development, 38(1-2), 1-135.'
                },
                {
                    "desc": 'Tomasello, M. (1999). The cultural origins of human cognition. Harvard University Press.'
                }
            ]
        }
    },
    {
        "style": "cs5",
        "data": {
            "list": [
                {
                    "desc": 'Abidin, R. R. (1995). Parenting Stress Index: Professional manual. Psychological Assessment Resources.'
                },
                {
                    "desc": 'Arnold, D. S., O\'Leary, S. G., Wolff, L. S., & Acker, M. M. (1993). The Parenting Scale: A measure of dysfunctional parenting in discipline situations. Psychological Assessment, 5(2), 137-144.'
                },
                {
                    "desc": 'Bradley, R. H., & Corwyn, R. F. (2005). Caring for children around the world: A view from HOME. International Journal of Behavioral Development, 29(5), 468-478.'
                },
                {
                    "desc": 'Davis, H. A. (2003). Conceptualizing the role and influence of student-teacher relationships on children\'s social and cognitive development. Educational Psychologist, 38(4), 207-234.'
                },
                {
                    "desc": 'Jones, T. L., & Prinz, R. J. (2005). Potential roles of parental self-efficacy in parent and child adjustment: A review. Clinical Psychology Review, 25(3), 341-363.'
                },
                {
                    "desc": 'Kline, R. B. (2011). Principles and practice of structural equation modeling. Guilford Press.'
                },
                {
                    "desc": 'Lovejoy, M. C., Weis, R., O\'Hare, E., & Rubin, E. C. (1999). Development and initial validation of the Parent Behavior Inventory. Psychological Assessment, 11(4), 534-545.'
                },
                {
                    "desc": 'sanders, M. R., Markie-Dadds, C., Tully, L. A., & Bor, W. (2000). The Triple P-Positive Parenting Program: A comparison of enhanced, standard, and self-directed behavioral family intervention for parents of children with early onset conduct problems. Journal of Consulting and Clinical Psychology, 68(4), 624-640.'
                },
                {
                    "desc": 'Webster-Stratton, C., & Hammond, M. (1997). Treating children with early-onset conduct problems: A comparison of child and parent training interventions. Journal of Consulting and Clinical Psychology, 65(1), 93-109.'
                },
                {
                    "desc": 'Zimet, G. D., Dahlem, N. W., Zimet, S. G., & Farley, G. K. (1988). The Multidimensional Scale of Perceived Social Support. Journal of Personality Assessment, 52(1), 30-41.'
                }
            ]
        }
    },
    {
        "style": "cs5",
        "data": {
            "list": []
        }
    },
    {
        "style": "cs5",
        "data": {
            "list": [
                {
                    "desc": 'Goodman, R. (1997). The Strengths and Difficulties Questionnaire: A research note. Journal of Child Psychology and Psychiatry, 38(5), 581-586.'
                },
                {
                    "desc": 'Goodman, R. (2001). Psychometric properties of the strengths and difficulties questionnaire. Journal of the American Academy of Child & Adolescent Psychiatry, 40(11), 1337-1345.'
                },
                {
                    "desc": 'Goodman, R., Meltzer, H., & Bailey, V. (1998). The strengths and difficulties questionnaire: A pilot study on the validity of the self-report version. European Child & Adolescent Psychiatry, 7(3), 125-130.'
                },
                {
                    "desc": 'Goodman, R., & Scott, S. (1999). Comparing the strengths and difficulties questionnaire and the child behavior checklist: Is small beautiful? Journal of Abnormal Child Psychology, 27(1), 17-24.'
                },
                {
                    "desc": 'Goodman, R., & Scott, S. (2002). Child psychiatry booms but recruitment crisis looms. British Medical Journal, 324(7347), 896-897.'
                },
                {
                    "desc": 'Muris, P., Meesters, C., & van den Berg, F. (2003). The strengths and difficulties questionnaire (SDQ): Further evidence for its reliability and validity in a community sample of Dutch children and adolescents. European Child & Adolescent Psychiatry, 12(1), 1-8.'
                },
                {
                    "desc": 'Van Roy, B., Groholt, B., Heyerdahl, S., & Clench-Aas, J. (2006). Understanding discrepancies in parent-child reporting of emotional and behavioural problems: Effects of relational and socio-demographic factors. BMC Psychiatry, 6(1), 56.'
                }
            ]
        }
    },
    {
        "style": "cs5",
        "data": {
            "list": [
                {
                    "desc": 'Leckman, J. F., Riddle, M. A., Hardin, M. T., Ort, S. I., Swartz, K. L., Stevenson, J., ... & Cohen, D. J. (1989). The Yale global tic severity scale: initial testing of a clinician-rated scale of tic severity. Journal of the American Academy of Child & Adolescent Psychiatry, 28(4), 566-573.'
                },
                {
                    "desc": 'storch, E. A., Murphy, T. K., Adkins, J. W., Lewin, A. B., Geffken, G. R., & Johns, N. B. (2005). The children’s Yale-Brown obsessive-compulsive scale: Psychometric properties of child-and parent-report formats. Journal of Anxiety Disorders, 19(8), 863-888.'
                },
                {
                    "desc": 'storch, E. A., Murphy, T. K., Geffken, G. R., Soto, O., Sajid, M., Allen, P., ... & Goodman, W. K. (2004). Psychometric evaluation of the children\'s Yale-Brown obsessive-compulsive scale. Psychiatry Research, 129(1), 91-98.'
                },
                {
                    "desc": 'scahill, L., Riddle, M. A., McSwiggin-Hardin, M., Ort, S. I., King, R. A., Goodman, W. K., ... & Leckman, J. F. (1997). Children\'s Yale-Brown obsessive compulsive scale: reliability and validity. Journal of the American Academy of Child & Adolescent Psychiatry, 36(6), 844-852.'
                },
                {
                    "desc": 'storch, E. A., Murphy, T. K., Geffken, G. R., Soto, O., Sajid, M., Allen, P., ... & Goodman, W. K. (2004). Psychometric evaluation of the children\'s Yale-Brown obsessive-compulsive scale. Psychiatry Research, 129(1), 91-98.'
                },
                {
                    "desc": 'storch, E. A., Murphy, T. K., Geffken, G. R., Soto, O., Sajid, M., Allen, P., ... & Goodman, W. K. (2004). Psychometric evaluation of the children\'s Yale-Brown obsessive-compulsive scale. Psychiatry Research, 129(1), 91-98.'
                }
            ]
        }
    }
]

datailJson = []
for k in range(len(names)):
    cursor.execute("SELECT * from lb_info where name='{}'".format(names[k]))
    data = cursor.fetchone()
    
    try:
        datailJsonT = json.loads(data['detail_json'])
    except Exception as error:
        datailJson.append([])
        datailJson[k].append(detail[k])
        
        continue;
    
    datailJsonT = json.loads(data['detail_json'])
    if isinstance(datailJsonT, str):
        datailJsonT = json.loads(datailJsonT)
    hasCs5 = False
    for i in range(len(datailJsonT)):
        if datailJsonT[i]['style'] == 'cs5':
            for list in range(len(detail[k]['data']['list'])):
                datailJsonT[i]['data']['list'].append(detail[k]['data']['list'][list])
            hasCs5 = True
    if hasCs5 == False:
        datailJsonT.append(detail[k])
    datailJson.append(datailJsonT)
   
print(json.dumps(datailJson))
out_file = open("1.json", "w",encoding="utf-8") 

out_file.write(str(datailJson))

# 关闭数据库连接
db.close()
