using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace EDoc2.Extensions
{
    public static class HostServiceConfig
    {
        static int? _httpPort = null;
        public static int HttpPort
        {
            get
            {
                if (_httpPort == null)
                {
                    string envPort = System.Environment.GetEnvironmentVariable("ExtServiceHttpPort");
                    if (!string.IsNullOrWhiteSpace(envPort) && int.TryParse(envPort, out int tmpPort))
                    {
                        _httpPort = tmpPort;
                    }
                    else
                    {
#if DEBUG
                        _httpPort = 6002;
#else
                        _httpPort = 80;
#endif

                    }
                }

                return _httpPort.Value;
            }
        }

        static string _localIp = null;
        public static string LocalIP
        {
            get
            {
                string evIp = Environment.GetEnvironmentVariable("HostMachineIp");
                _localIp = !string.IsNullOrWhiteSpace(evIp) ? evIp : _localIp;
                if (_localIp == null)
                {
                    string hostName = Dns.GetHostName();
                    IPHostEntry ipEntity = Dns.GetHostEntry(hostName);
                    for (int i = 0; i < ipEntity.AddressList.Length; i++)
                    {
                        if (ipEntity.AddressList[i].AddressFamily == System.Net.Sockets.AddressFamily.InterNetwork)
                        {
                            _localIp = ipEntity.AddressList[i].ToString();
                            break;
                        }
                    }
                }

                return _localIp;
            }
        }
    }
}
