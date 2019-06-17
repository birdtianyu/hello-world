# -*- coding: utf-8 -*-
# @Author: jc-Xu-h
# @Date:   2019-06-17 10:22:03
# @Last Modified by:   jc-Xu-h
# @Last Modified time: 2019-06-17 14:03:21

import matplotlib.pyplot as plt
import numpy as np


# 样本特征值(2维)
# 样本一
x11 = 0.2
x12 = 0.4
y1 = 2.5

# 样本二
x21 = 0.2
x22 = 0.6
y2 = 3

# 样本三
x31 = 0.5
x32 = 0.3
y3 = 2


#构造等高线函数
def f(w1,w2):
    return (y1 - (w1*x11+w2*x12))**2 + (y2 - (w1*x21+w2*x22))**2 + (y3 - (w1*x31+w2*x32))**2


def L1(w1,w2):
    return abs(w1) + abs(w2)

def L2(w1,w2):
    return w1**2 + w2**2


#定义点的数量
n=500

#作点
w1=np.linspace(-10,10,500)
w2=np.linspace(-10,10,500)

#构造网格
X,Y=np.meshgrid(w1,w2)

# plt.xlabel('w1')
# plt.ylabel('w2')
plt.figure(figsize=(8,8))
ax = plt.gca()                                            # get current axis 获得坐标轴对象

ax.spines['right'].set_color('none') 
ax.spines['top'].set_color('none')         # 将右边 上边的两条边颜色设置为空 其实就相当于抹掉这两条边

ax.xaxis.set_ticks_position('bottom')   
ax.yaxis.set_ticks_position('left')          # 指定下边的边作为 x 轴   指定左边的边为 y 轴

ax.spines['bottom'].set_position(('data', 0))   #指定 data  设置的bottom(也就是指定的x轴)绑定到y轴的0这个点上
ax.spines['left'].set_position(('data', 0))

#绘制等高线,8表示等高线数量加1
C1 = plt.contour(X,Y,f(X,Y),[0.5, 1, 2, 3], linewidths=1)
L1 = plt.contour(X,Y,L1(X,Y),[3.5, 5], linewidths=1, linestyles="-.", colors='blue')
L2 = plt.contour(X,Y,L2(X,Y),[9, 16], linewidths=1, linestyles="--", colors='red')
plt.clabel(C1, inline=True, fontsize=10)
plt.clabel(L1, inline=True, fontsize=10)
plt.clabel(L2, inline=True, fontsize=10)

plt.title('L1 Regularizer & L2 Regularizer', fontsize='large', fontweight='bold')
# 设置坐标轴label的大小，背景色等信息
# for label in ax.get_xticklabels() + ax.get_yticklabels():
#     label.set_fontsize(12)
#     label.set_bbox(dict(facecolor = 'green', edgecolor = 'None', alpha = 0.7))

plt.show()