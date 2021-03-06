from scipy.stats import beta
import matplotlib.pyplot as plt
import numpy as np
 
x = np.linspace(0, 1, 100)
 
a_array = [0.5, 1, 1.4, 1.7, 2, 4]
b_array = [0.5, 1, 1.4, 1.7, 2, 4]
 
fig, axarr = plt.subplots(len(a_array), len(b_array))
 
for i, a in enumerate(a_array):
  for j, b in enumerate(b_array):
    axarr[i, j].plot(x, beta.pdf(x, a, b), 'r', lw=1, alpha=0.6, label='a='+str(a)+',b='+str(b))
    axarr[i, j].legend(frameon=False)
 
plt.show()
