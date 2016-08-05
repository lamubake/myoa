var str = '';
var copyright = '金格科技iWebPlugin多浏览器插件[演示版];V5.0S0xGAAEAAAAAAAAAEAAAAGoBAABwAQAALAAAADZicNjUxIvdp2tQOtALFDP/H3lY+cT3AgMj0PqXB00VnzBtyS7pmQ2gFJigUCYLQvgSX2jn4F3hW7wkVH+0ljcMfPTh9Yva06lSjJeg/Be9+5kuc5xW2qswqgMehqVSItpvjEMZFBfJ6jGN/6gRGfs7e//HtnAEjgr3YrPo3oQhg3MpAdYhqUhbgeMwi1+vMBTXd/oFdmGlJBkevmPKRna8y63LiJqJwbjCJt+lLqhiwY8RZ4U9F0rk+Tibl9hbxpRpfvahde+sKeuAbbw2qmZ2vIZV2TuAPGjQUM/I7V+AswJ6kMCHiSUF2RZKvDY6tbUGdpkD8EhmRAdeVojx6wKPi+WJM6XmoxgIl2fmOc9a7S6GaHCjCWzzAP4x/a3VNDFMxEjRSI9A8Al8ZpjJQz4tlOm1qT4PooZL00Tn9wKV54+PdT/qMadETe4L5TG1vnfioZYhNKfptmWzcF/HA+gFvrW9qV8nmCDhgcp2dASfu1sSsHcmWor+ayokFY5cTA==';
//var copyright="贵州省人民政府[专用];V5.0S0xGAAEAAAAAAAAAEAAAAEgBAABQAQAALAAAADNEE5lfECl1LbUtseJ7c67Eqqm1P79XKG2f8ZvJ0E07j6dyVw/s6PFnCHiCSSMFgUTNoc3kA7q12KeHc1FQ1fq1IFEjsd09oV2v+dGKDRAEd+QCQMAVmOTI5JSgcO2wjsI8aI4C49znvcCjydm3020B1YjTQo4RqZjnpreqcBGILPApgH4b+dl7eBe/jdXV0aaOh5ENOpdnqWNsvZZrmqYtEf1FfVx03YxEHBPOr6ua9nenA1hgQSkyM12mg/+6SV9xLH6/laCn8BV0juhN9kqhQfjyaV8zUjYy4x5CgzvI5pZ9WHrVgxrjEB/SvlpOkbi5jaXsByO1THtRc+QX2Wi/b8b/kLnJqml15tX9UxFSHGZVQ3CiNNBcIwdZko8bu43kHIaeYWMGRi8HqEOczduknmnsO6vVMv460/FP0xrStA28Pmw90o5Fl4kHvvFi7soLsal8ecPr477stG7Z18A=";
str += '<object id="WebOffice" ';

str += ' width="100%"';
str += ' height="100%"';

if ((window.ActiveXObject!=undefined) || (window.ActiveXObject!=null) ||"ActiveXObject" in window)
{
    //str += ' classid="clsid:8B23EA28-2009-402F-92C4-59BE0E063499"  codeBase="iWebOffice2009.cab#version=10,8,4,2"';
    str +=' classid="clsid:23739A7E-5741-4D1C-88D5-D50B18F7C347" codebase="iWebOffice2003.ocx#version=8,8,5,6"';
    str += '>';
}
else
{
    str += ' progid="iWebOffice2003.iWebOffice"';
    str += ' type="application/iwebplugin"';
    str += ' OnCommand="OnCommand"';
    str += ' OnReady="OnReady"';
    str += ' OnOLECommand="OnOLECommand"';
    str += ' OnExecuteScripted="OnExecuteScripted"';
    str += ' OnQuit="OnQuit"';
    str += ' OnSendStart="OnSendStart"';
    str += ' OnSending="OnSending"';
    str += ' OnSendEnd="OnSendEnd"';
    str += ' OnRecvStart="OnRecvStart"';
    str += ' OnRecving="OnRecving"';
    str += ' OnRecvEnd="OnRecvEnd"';
    str += ' Copyright="' + copyright + '"';
    str += '>';
}
str += '</object>';
document.write(str); 