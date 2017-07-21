package com.model.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QClient is a Querydsl query type for Client
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QClient extends EntityPathBase<Client> {

    private static final long serialVersionUID = 562840164L;

    public static final QClient client = new QClient("client");

    public final NumberPath<Integer> accessTokenValidity = createNumber("accessTokenValidity", Integer.class);

    public final StringPath additionalInformation = createString("additionalInformation");

    public final StringPath authorities = createString("authorities");

    public final StringPath authorizedGrantTypes = createString("authorizedGrantTypes");

    public final StringPath autoApprove = createString("autoApprove");

    public final StringPath clientSecret = createString("clientSecret");

    public final StringPath id = createString("id");

    public final NumberPath<Integer> refreshTokenValidity = createNumber("refreshTokenValidity", Integer.class);

    public final StringPath resourceIds = createString("resourceIds");

    public final StringPath scope = createString("scope");

    public final StringPath webServerRedirectUri = createString("webServerRedirectUri");

    public QClient(String variable) {
        super(Client.class, forVariable(variable));
    }

    public QClient(Path<? extends Client> path) {
        super(path.getType(), path.getMetadata());
    }

    public QClient(PathMetadata metadata) {
        super(Client.class, metadata);
    }

}

