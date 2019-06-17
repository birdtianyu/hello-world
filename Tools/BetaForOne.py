from scipy.stats import beta
import matplotlib.pyplot as plt
import numpy as np
 
x = np.linspace(0, 1, 100)
 
a_array = [0.5, 1, 1.5, 2, 4, 8, 16]
b_array = [0.5, 1, 1.5, 2, 4, 8, 16]
 
for i, a in enumerate(a_array):
  for j, b in enumerate(b_array):
    plt.plot(x, beta.pdf(x, a, b), lw=1, alpha=0.6, label='a='+str(a)+',b='+str(b))
 
plt.legend(frameon=False)
plt.show()
