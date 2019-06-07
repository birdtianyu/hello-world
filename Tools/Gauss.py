import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

class Distribution():
    def __init__(self,mu,Sigma):
        self.mu = mu           # 期待値
        self.sigma = Sigma     # 分散

    def tow_d_gaussian(self,x):
        mu = self.mu
        Sigma =self.sigma
        n = mu.shape[0]
        Sigma_det = np.linalg.det(Sigma)
        Sigma_inv = np.linalg.inv(Sigma)
        N = np.sqrt((2*np.pi)**n*Sigma_det)

        fac = np.einsum('...k,kl,...l->...',x-mu,Sigma_inv,x-mu)

        return np.exp(-fac/2)/N

    def one_d_gaussian(self,x):
        mu = self.mu
        sigma = self.sigma

        N = np.sqrt(2*np.pi*np.power(sigma,2))
        fac = np.power(x-mu,2)/np.power(sigma,2)
        return np.exp(-fac/2)/N


if __name__=='__main__':

    
    mu1 = 0.      # 期待値1
    Sigma1 = 1.0  # 分散1
    
    mu2 = 2.      # 期待値2
    Sigma2 = 3.0  # 分散2

    cov = 0     # 共分散

    #一维 ##########################################################################################
    p1_1 = Distribution(mu1,Sigma1)
    x = np.linspace(-10,10,100)
    y = p1_1.one_d_gaussian(x)
    plt.plot(x,y,'b-',linewidth=3)
    # plt.show()

    p1_2 = Distribution(mu2,Sigma2)
    x = np.linspace(-10,10,100)
    y = p1_2.one_d_gaussian(x)
    plt.plot(x,y,'r-',linewidth=3)
    
    #二维 ##########################################################################################

    # 间隔个数
    N = 60
    # X轴范围
    X = np.linspace(-4,4,N)
    # Y轴范围
    Y = np.linspace(-4,4,N)
    X,Y = np.meshgrid(X,Y)
    
    # 期待値
    mu = np.array([mu1, mu2]) 
    
    # 分散
    Sigma = np.array([[Sigma1,  cov ],
                      [ cov,  Sigma2]])

    pos = np.empty(X.shape+(2,))
    pos[:,:,0]= X
    pos[:,:,1] = Y

    p2 = Distribution(mu,Sigma)
    Z = p2.tow_d_gaussian(pos)
    ###########################################################################################

    fig =plt.figure()
    ax = fig.gca(projection='3d')
    ax.plot_surface(X,Y,Z,rstride=1,cstride=1,linewidth=1,antialiased=True, cmap='rainbow')
    cset = ax.contour(X,Y,Z,zdir='z',offset=-0.15)

    # display
    print("期待値： ", mu)
    print("分  散：　", Sigma)
    ax.set_zlim(-0.15,0.2)
    ax.set_zticks(np.linspace(0,0.2,5))
    ax.view_init(27,-21)
    plt.show()
