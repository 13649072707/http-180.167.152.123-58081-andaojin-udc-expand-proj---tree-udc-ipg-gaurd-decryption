using EDoc2.Ext.Dto;
using System;
using System.Collections.Concurrent;

namespace EDoc2.Web.nacos
{
    public class ExtServiceConfigListen : Nacos.V2.IListener
    {

        private ExtServiceConfigListener _listenre;
        public ExtServiceConfigListen(ExtServiceConfigListener listenre)
        {
            _listenre=listenre;
        }


        public void ReceiveConfigInfo(string configInfo)
        {

            if (!string.IsNullOrWhiteSpace(configInfo))
            {
                _listenre.UpdateConfig(configInfo);
            }
            Console.WriteLine($"ReceiveConfigInfo:{configInfo}");
            


            //throw new System.NotImplementedException();
        }
    }
}
