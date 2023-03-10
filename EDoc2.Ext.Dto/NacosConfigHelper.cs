namespace EDoc2.Ext.Dto
{
    public static class NacosConfigHelper
    {
        private static string _serverAddress = null;
        public static string ServerAddresses
        {
            get
            {
                if (_serverAddress == null)
                {
                    _serverAddress = System.Environment.GetEnvironmentVariable("NacosServerAddresses");
                }

#if DEBUG
                if (string.IsNullOrEmpty(_serverAddress))
                {
                    _serverAddress = "http://localhost:8848/";
                }
#endif
                return _serverAddress;
            }
        }

        static string _nameSpace = null;
        public static string DefaultNamespace
        {
            get
            {
                if (_nameSpace==null)
                {

                    _nameSpace = System.Environment.GetEnvironmentVariable("Namespace");
                    if (string.IsNullOrEmpty(_nameSpace))
                    {
                        _nameSpace = "";
                    }
                }

                return _nameSpace;
            }
        }



        static string _groupName = null;
        public static string DefaultGroupName
        {
            get
            {
                if (string.IsNullOrWhiteSpace(_groupName))
                {

                    _groupName = System.Environment.GetEnvironmentVariable("GroupName");
                    if (string.IsNullOrEmpty(_groupName))
                    {
                        _groupName = "edoc2ext_group";
                    }
                }

                return _groupName;
            }
        }

        static string _clusterName = null;
        public static string DefaultClusterName
        {
            get
            {
                if (string.IsNullOrWhiteSpace(_clusterName))
                {

                    _clusterName = System.Environment.GetEnvironmentVariable("ClusterName");
                    if (string.IsNullOrEmpty(_clusterName))
                    {
                        _clusterName = "edoc2ext";
                    }
                }

                return _clusterName;
            }
        }

    }
}
