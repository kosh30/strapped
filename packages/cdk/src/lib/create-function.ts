import * as cdk from "aws-cdk-lib";
import * as iam from "aws-cdk-lib/aws-iam";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

export const createFunction=(scope:Construct, name: string,{
        createPublicUrl,
        publicUrlAccessors,
        codeDistSourcePath,
        ...props
}:Partial<lambda.FunctionProps> & AdditionalFuncOptions={}):CreateFunctionResult=>{

    const id = name + "-func";
    const func = new lambda.Function(scope, id, {
        runtime: lambda.Runtime.NODEJS_14_X,
        architecture: lambda.Architecture.ARM_64,
        code: lambda.Code.fromAsset(codeDistSourcePath?`../../dist/${codeDistSourcePath}`:`../../dist/functions/${id}`),
        handler: `main.handler`,
        ...props,
    });

    let url:lambda.FunctionUrl|undefined=undefined;

    if(createPublicUrl){
        url = func.addFunctionUrl({
            authType:publicUrlAccessors===undefined?
                lambda.FunctionUrlAuthType.NONE:
                lambda.FunctionUrlAuthType.AWS_IAM,
            cors:{
                allowCredentials:true,
                allowedHeaders:['*'],
                allowedMethods:[lambda.HttpMethod.ALL],
                allowedOrigins:['*'],
                maxAge:cdk.Duration.days(1),
            }
        });
        if(publicUrlAccessors){
            for(const a of publicUrlAccessors){
                url.grantInvokeUrl(a);
            }
        }else if(publicUrlAccessors!==false){
            url.grantInvokeUrl(new iam.AnyPrincipal());
        }
        new cdk.CfnOutput(scope, "funcUrl00" + name, { value: url.url });
    }

    new cdk.CfnOutput(scope, "funcName00" + name, { value: func.functionName });
    return {name,upperName:getFuncUpperName(name),func,url};
}

export interface AdditionalFuncOptions
{
    /**
     * If true a public URL will be created for the function
     */
    createPublicUrl?:boolean;

    /**
     * A collection of IGrantables that are allowed to call the function. If not defined then
     * anybody is allowed to call the url.
     */
    publicUrlAccessors?:iam.IGrantable[]|false;

    codeDistSourcePath?:string;
}

export interface CreateFunctionResult
{
    upperName:string;
    name:string;
    func:lambda.Function;
    url?:lambda.FunctionUrl;
}

export const getFuncUpperName=(name:string)=>name.replace(/[_\W]/g,'').toUpperCase();
