<?
//����ѹ����ʶ
if (!defined("CRS_GZ"))
{
    define("CRS_GZ", true);
}
if (!defined("CRS_FORCE_CACHE"))
{
    define("CRS_FORCE_CACHE", false);
}
if (!defined("CRS_STATIS"))
{
    define("CRS_STATIS", true);
}
if (!defined("MIN_POSTFIX"))
{
    define("MIN_POSTFIX", "-min");//-min
}
if (!defined("USE_PACK"))
{
    define("USE_PACK", 1);//1
}
if (!defined("USE_GZ"))
{
    define("USE_GZ", ".gz");//.gz
}
//����ǩ��ǰ�Ƿ����USBKEY������֤
if(!defined("TO_CHECK_KEY_BEFORE_SEAL"))
{
    define("TO_CHECK_KEY_BEFORE_SEAL", false);//true
}
//�����Ƿ�ʵʱ����Excel��ʽ
if(!defined("CALCULATE_IN_TIME"))
{
    define("CALCULATE_IN_TIME", false);//true
}
//���Ʊ������ʱ�Ƿ�ͬ���������Ա�����ٴμ���
if(!defined("SYNC_QUERY_DATA"))
{
    define("SYNC_QUERY_DATA", false);//true
}
?>