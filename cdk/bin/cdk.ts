#!/usr/bin/env node
import cdk = require('aws-cdk-lib');
import { EcsMoodleStack } from '../lib/ecs-moodle-stack';
import { CloudFrontWAFWebAclStack } from '../lib/cloudfront-waf-web-acl-stack';
//import { aws_codedeploy as codedeploy } from 'aws-cdk-lib';
//import * as ecs from 'aws-cdk-lib/aws-ecs';
//import * as codedeploy from 'aws-cdk-lib/aws-codedeploy';
//import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2';

const app = new cdk.App();

const cloudFrontWAFWebAclStack = new CloudFrontWAFWebAclStack(app, 'cloudfront-waf-web-acl-stack', {
  env: {
    region: 'us-east-1'
  }
});

const ecsMoodleStack = new EcsMoodleStack(app, 'ecs-moodle-stack', {
  albCertificateArn: app.node.tryGetContext('app-config/albCertificateArn'),
  cfCertificateArn: app.node.tryGetContext('app-config/cfCertificateArn'),
  cfDomain: app.node.tryGetContext('app-config/cfDomain'),
  moodleImageUri: app.node.tryGetContext('app-config/moodleImageUri'),
  serviceReplicaDesiredCount: app.node.tryGetContext('app-config/serviceReplicaDesiredCount'),
  serviceHealthCheckGracePeriodSeconds: app.node.tryGetContext('app-config/serviceHealthCheckGracePeriodSeconds'),
  cfDistributionOriginTimeoutSeconds: app.node.tryGetContext('app-config/cfDistributionOriginTimeoutSeconds'),
  rdsEventSubscriptionEmailAddress: app.node.tryGetContext('app-config/rdsEventSubscriptionEmailAddress'),
  rdsInstanceType: app.node.tryGetContext('app-config/rdsInstanceType'),
  elastiCacheRedisInstanceType: app.node.tryGetContext('app-config/elastiCacheRedisInstanceType')
});
ecsMoodleStack.addDependency(cloudFrontWAFWebAclStack);

// const targetGroupInfoProperty: codedeploy.CfnDeploymentGroup.TargetGroupInfoProperty = {
//   name: 'Blue',
// };

// declare const myApplication: codedeploy.EcsApplication;
// const cluster: any = ecs.Cluster;
// const taskDefinition: any = ecs.FargateTaskDefinition;
// declare const blueTargetGroup: elbv2.ITargetGroup;
// declare const greenTargetGroup: elbv2.ITargetGroup;
// declare const listener: elbv2.IApplicationListener;

// const service = new ecs.FargateService(ecsMoodleStack, 'Service', {
//   cluster,
//   taskDefinition,
//   deploymentController: {
//     type: ecs.DeploymentControllerType.CODE_DEPLOY,
//   },
// });



// import cdk = require('aws-cdk-lib');
// import { EcsMoodleStack } from '../lib/ecs-moodle-stack';
// import { CloudFrontWAFWebAclStack } from '../lib/cloudfront-waf-web-acl-stack';
// import * as ecs from 'aws-cdk-lib/aws-ecs';
// import * as codedeploy from 'aws-cdk-lib/aws-codedeploy';
// import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2';

 

// const app = new cdk.App();

 

// const cloudFrontWAFWebAclStack = new CloudFrontWAFWebAclStack(app, 'cloudfront-waf-web-acl-stack', {
//   env: {
//     region: 'us-east-1'
//   }
// });

 

// const ecsMoodleStack = new EcsMoodleStack(app, 'ecs-moodle-stack', {
//   albCertificateArn: app.node.tryGetContext('app-config/albCertificateArn'),
//   cfCertificateArn: app.node.tryGetContext('app-config/cfCertificateArn'),
//   cfDomain: app.node.tryGetContext('app-config/cfDomain'),
//   moodleImageUri: app.node.tryGetContext('app-config/moodleImageUri'),
//   serviceReplicaDesiredCount: app.node.tryGetContext('app-config/serviceReplicaDesiredCount'),
//   serviceHealthCheckGracePeriodSeconds: app.node.tryGetContext('app-config/serviceHealthCheckGracePeriodSeconds'),
//   cfDistributionOriginTimeoutSeconds: app.node.tryGetContext('app-config/cfDistributionOriginTimeoutSeconds'),
//   rdsEventSubscriptionEmailAddress: app.node.tryGetContext('app-config/rdsEventSubscriptionEmailAddress'),
//   rdsInstanceType: app.node.tryGetContext('app-config/rdsInstanceType'),
//   elastiCacheRedisInstanceType: app.node.tryGetContext('app-config/elastiCacheRedisInstanceType')
// });

 

// // Add dependency between stacks
// ecsMoodleStack.addDependency(cloudFrontWAFWebAclStack);

 

// // Assuming these resources are defined in the EcsMoodleStack
// const myApplication = ecsMoodleStack.myApplication;
// const cluster = ecsMoodleStack.cluster;
// const taskDefinition = ecsMoodleStack.taskDefinition;
// const blueTargetGroup = ecsMoodleStack.blueTargetGroup;
// const greenTargetGroup = ecsMoodleStack.greenTargetGroup;
// const listener = ecsMoodleStack.listener;

 

// // Creating ECS Fargate Service
// const service = new ecs.FargateService(ecsMoodleStack, 'Service', {
//   cluster,
//   taskDefinition,
//   deploymentController: {
//     type: ecs.DeploymentControllerType.CODE_DEPLOY,
//   },
// });

 

// // Creating ECS Deployment Group using CodeDeploy
// new codedeploy.EcsDeploymentGroup(ecsMoodleStack, 'BlueGreenDG', {
//   service,
//   blueGreenDeploymentConfig: {
//     blueTargetGroup,
//     greenTargetGroup,
//     listener,
//   },
//   deploymentConfig: codedeploy.EcsDeploymentConfig.CANARY_10PERCENT_5MINUTES,
// });